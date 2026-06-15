import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { DbStore, BlogPost, TeamMember, Milestone, CoreArea, DbHeroSlide, DbAffiliation } from './server-db';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory active sessions tracker
const activeSessions = new Set<string>();

// custom rate limiter map: IP -> { attempts, lockedUntil }
const loginRateLimit = new Map<string, { attempts: number; lockedUntil: number }>();

// Auth rate limiting middleware helper
function checkLoginRateLimit(ip: string): { success: boolean; message?: string } {
  const limit = loginRateLimit.get(ip);
  const now = Date.now();

  if (limit && limit.lockedUntil > now) {
    const secondsLeft = Math.ceil((limit.lockedUntil - now) / 1000);
    return {
      success: false,
      message: `Too many login attempts. Please try again in ${secondsLeft} seconds.`
    };
  }

  return { success: true };
}

function recordLoginAttempt(ip: string, success: boolean) {
  const limit = loginRateLimit.get(ip) || { attempts: 0, lockedUntil: 0 };
  
  if (success) {
    loginRateLimit.delete(ip);
  } else {
    limit.attempts += 1;
    if (limit.attempts >= 5) {
      limit.lockedUntil = Date.now() + 60000; // 1 min lock
      limit.attempts = 0; // reset counter once locked
    }
    loginRateLimit.set(ip, limit);
  }
}

// Global middleware validation guard: check if user is admin
function isAdmin(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Access denied. No session token provided." });
    return;
  }

  const token = authHeader.replace('Bearer ', '').trim();
  if (!activeSessions.has(token)) {
    res.status(403).json({ error: "Invalided or expired session token. Please login again." });
    return;
  }

  next();
}

// ==========================================
// API REST ENDPOINTS
// ==========================================

// Auth Login (Accepts credentials, sets active token tracker)
app.post('/api/auth/login', (req: Request, res: Response): void => {
  const clientIp = req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
  
  // Rate limits check
  const rateLimitStatus = checkLoginRateLimit(clientIp);
  if (!rateLimitStatus.success) {
    res.status(429).json({ error: rateLimitStatus.message });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Please offer both email and password." });
    return;
  }

  // Admin access validation parameters
  const isMatch = (
    (email === 'admin@dpcl.com' || email === 'godshandudoh@gmail.com') && 
    (password === 'admin123' || password === 'admin')
  );

  if (!isMatch) {
    recordLoginAttempt(clientIp, false);
    res.status(401).json({ error: "Invalid credentials. Try admin@dpcl.com with password 'admin123'" });
    return;
  }

  recordLoginAttempt(clientIp, true);

  // Generate unique clean session token
  const sessionToken = `dpcl-sec-tok-${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
  activeSessions.add(sessionToken);

  res.json({
    message: "Login success",
    token: sessionToken,
    user: {
      email,
      role: "admin"
    }
  });
});

// Auth Logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '').trim();
    activeSessions.delete(token);
  }
  res.json({ message: "Successfully logged out." });
});

// Blog CRUD
app.get('/api/blogs', async (req: Request, res: Response): Promise<void> => {
  try {
    const isEditingView = req.query.view === 'all';
    let blogs = await DbStore.getBlogs();
    if (!isEditingView) {
      // Only return Published blogs for public viewer
      blogs = blogs.filter(b => b.status === 'Published');
    }
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to cloud and load blogs." });
  }
});

app.post('/api/blogs', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, date, imageUrl, text, status } = req.body;
    if (!title || !text) {
      res.status(400).json({ error: "Title and content description text are required." });
      return;
    }

    const newBlog = await DbStore.addBlog({
      title,
      category: category || "GENERAL INDUSTRY",
      date: date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
      text,
      status: status || 'Published'
    });

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: "Failed to save blog onto cloud instance." });
  }
});

app.put('/api/blogs/:id', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await DbStore.updateBlog(id, req.body);
    if (!updated) {
      res.status(404).json({ error: "Blog post not found." });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to modify post info dynamically." });
  }
});

app.delete('/api/blogs/:id', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const success = await DbStore.deleteBlog(id);
    if (!success) {
      res.status(404).json({ error: "Blog post not found." });
      return;
    }
    res.json({ success: true, message: "Blog successfully deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog post resource." });
  }
});

// Site Content (Core Areas & Milestones)
app.get('/api/site-content', async (req: Request, res: Response): Promise<void> => {
  try {
    const coreAreas = await DbStore.getCoreAreas();
    const milestones = await DbStore.getMilestones();
    res.json({ coreAreas, milestones });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch general layout details." });
  }
});

app.put('/api/site-content', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, payload } = req.body;
    
    if (type === 'milestones') {
      if (!Array.isArray(payload)) {
        res.status(400).json({ error: "Payload must be an array of milestone items." });
        return;
      }
      const updated = await DbStore.updateMilestones(payload as Milestone[]);
      res.json({ success: true, milestones: updated });
      return;
    }

    if (type === 'coreArea') {
      const { id, title, text, badge } = payload;
      if (!id || !title || !text) {
        res.status(400).json({ error: "Missing required fields for coreArea." });
        return;
      }
      const updated = await DbStore.updateCoreArea(id, { title, text, badge });
      if (!updated) {
        res.status(404).json({ error: "Core area ID not found." });
        return;
      }
      res.json({ success: true, coreArea: updated });
      return;
    }

    res.status(400).json({ error: "Invalid dynamic CMS editing action format." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update layout elements." });
  }
});

// Team Management
app.get('/api/team', async (req: Request, res: Response) => {
  try {
    const team = await DbStore.getTeam();
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teammate roster." });
  }
});

app.post('/api/team', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role, bio, isPending, avatarText } = req.body;
    if (!name || !role) {
      res.status(400).json({ error: "Name and partner Role description are required." });
      return;
    }

    const newMember = await DbStore.addTeamMember({
      name,
      role,
      bio: bio || "Biography details pending review.",
      isPending: isPending === undefined ? true : isPending,
      avatarText: avatarText || name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
    });

    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: "Failed to add team member to Firestore." });
  }
});

app.put('/api/team/:id', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await DbStore.updateTeamMember(id, req.body);
    if (!updated) {
      res.status(404).json({ error: "Team member not found." });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to modify teammate parameters." });
  }
});

app.delete('/api/team/:id', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const success = await DbStore.deleteTeamMember(id);
    if (!success) {
      res.status(404).json({ error: "Team member not found." });
      return;
    }
    res.json({ success: true, message: "Team member successfully removed." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete team member." });
  }
});

// Helper function to send automated email notification via EmailJS gateway
async function sendEmailJSEmail(inquiry: { name: string; email: string; phone: string; subject: string; message: string }): Promise<boolean> {
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.log("[EmailJS Routing] EmailJS variables are not fully configured in your Environment/Secrets tab.");
    console.log("[EmailJS Routing] Please add EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY to enable automatic forwarding to info@dpcl.com.ng.");
    return false;
  }

  try {
    console.log(`[EmailJS Routing] Sending automated notification to EmailJS (Service: ${serviceId}, Template: ${templateId})`);
    
    // Construct standard EmailJS REST payload structure
    const payload: any = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: "info@dpcl.com.ng",
        name: inquiry.name,
        from_name: inquiry.name,
        email: inquiry.email,
        from_email: inquiry.email,
        phone: inquiry.phone,
        subject: inquiry.subject,
        message: inquiry.message,
        reply_to: inquiry.email,
        timestamp: new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC'
      }
    };

    if (privateKey) {
      payload.accessToken = privateKey;
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      console.log("[EmailJS Routing] Automated email forwarding succeeded! Sent to info@dpcl.com.ng.");
      return true;
    } else {
      const respError = await response.text();
      console.error("[EmailJS Routing] Failed with Status:", response.status, "Message:", respError);
      return false;
    }
  } catch (error) {
    console.error("[EmailJS Routing] Connection exception sending to EmailJS API gateway:", error);
    return false;
  }
}

// Contact Inquiries
app.post('/api/inquiries', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email and inquiry message text are mandatory." });
      return;
    }

    const phoneVal = phone || "No Phone Passed";
    const subjectVal = subject || "General Inquiry";

    const newInquiry = await DbStore.addInquiry({
      name,
      email,
      phone: phoneVal,
      subject: subjectVal,
      message
    });

    // Asynchronously trigger automated EmailJS routing without blocking client response speed
    sendEmailJSEmail({
      name,
      email,
      phone: phoneVal,
      subject: subjectVal,
      message
    }).catch(err => {
      console.error("[EmailJS Routing] Background task failure:", err);
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your inquiry has been filed securely in our database. A DPCL consultant will contact you shortly and an email notification has been dispatched.",
      inquiry: newInquiry
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to file inquiry." });
  }
});

app.get('/api/inquiries', isAdmin, async (req: Request, res: Response) => {
  try {
    const inquiriesData = await DbStore.getInquiries();
    const sorted = [...inquiriesData].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: "Failed to load submitted inquiries." });
  }
});

app.put('/api/inquiries/:id/read', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await DbStore.toggleInquiryRead(id);
    if (!updated) {
      res.status(404).json({ error: "Inquiry not found." });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle inquiry status." });
  }
});

app.delete('/api/inquiries/:id', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await DbStore.deleteInquiry(id);
    if (!deleted) {
      res.status(404).json({ error: "Inquiry not found." });
      return;
    }
    res.json({ success: true, message: "Inquiry successfully removed from server database." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete inquiry from secure storage." });
  }
});

// ==========================================
// HERO SLIDES DYNAMIC CONTROL ENDPOINTS
// ==========================================
app.get('/api/hero-slides', async (req: Request, res: Response) => {
  try {
    const slides = await DbStore.getHeroSlides();
    res.json(slides);
  } catch (err) {
    res.status(500).json({ error: "Failed to load dynamic hero slides." });
  }
});

app.post('/api/hero-slides', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, subtitle, badge, imageUrl } = req.body;
    if (!title || !subtitle) {
      res.status(400).json({ error: "Title and Subtitle are required." });
      return;
    }
    const newSlide = await DbStore.addHeroSlide({
      title,
      subtitle,
      badge: badge || "ANNOUNCEMENT",
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600"
    });
    res.status(201).json(newSlide);
  } catch (err) {
    res.status(500).json({ error: "Failed to save new slide." });
  }
});

app.put('/api/hero-slides/:id', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await DbStore.updateHeroSlide(id, req.body);
    if (!updated) {
      res.status(404).json({ error: "Hero slide not found." });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update hero slide." });
  }
});

app.delete('/api/hero-slides/:id', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const success = await DbStore.deleteHeroSlide(id);
    if (!success) {
      res.status(404).json({ error: "Hero slide not found." });
      return;
    }
    res.json({ success: true, message: "Hero slide successfully removed." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete hero slide." });
  }
});

// ==========================================
// PROFESSIONAL AFFILIATIONS DYNAMIC CONTROL
// ==========================================
app.get('/api/affiliations', async (req: Request, res: Response) => {
  try {
    const affs = await DbStore.getAffiliations();
    res.json(affs);
  } catch (err) {
    res.status(500).json({ error: "Failed to load dynamic affiliations." });
  }
});

app.post('/api/affiliations', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, initials, icon, color } = req.body;
    if (!fullName || !initials) {
      res.status(400).json({ error: "Full Name and Initials are required." });
      return;
    }
    const newAff = await DbStore.addAffiliation({
      fullName,
      initials,
      icon: icon || "globe",
      color: color || "#3b82f6"
    });
    res.status(201).json(newAff);
  } catch (err) {
    res.status(500).json({ error: "Failed to save new affiliation." });
  }
});

app.put('/api/affiliations/:id', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await DbStore.updateAffiliation(id, req.body);
    if (!updated) {
      res.status(404).json({ error: "Affiliation not found." });
      return;
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update affiliation." });
  }
});

app.delete('/api/affiliations/:id', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const success = await DbStore.deleteAffiliation(id);
    if (!success) {
      res.status(404).json({ error: "Affiliation not found." });
      return;
    }
    res.json({ success: true, message: "Affiliation successfully removed." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete affiliation." });
  }
});


// ==========================================
// GLOBALLY OPTIMIZED SEO ENDPOINTS (Sitemap & Robots)
// ==========================================

app.get('/robots.txt', (req: Request, res: Response) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://dpcl.com.ng/sitemap.xml`);
});

app.get('/sitemap.xml', async (req: Request, res: Response): Promise<void> => {
  res.setHeader('Content-Type', 'application/xml');
  
  // Fetch dynamic blogs to add to the sitemap too!
  let blogs: any[] = [];
  try {
    blogs = await DbStore.getBlogs();
  } catch (err) {
    // fallback if DB call has issues
    blogs = [];
  }

  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Static Sections / Pages (SEO optimized anchor fallbacks) -->
  <url>
    <loc>https://dpcl.com.ng/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dpcl.com.ng/#services</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dpcl.com.ng/#team</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dpcl.com.ng/#blog-events</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dpcl.com.ng/#publications</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://dpcl.com.ng/#contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;

  // Dynamically inject all published blogs into the Sitemap for incredible SEO ranking power
  blogs.forEach(blog => {
    if (blog.status === 'Published') {
      const idOrSlug = blog.id || String(blog.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      xml += `  <url>
    <loc>https://dpcl.com.ng/#blog-${idOrSlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }
  });

  xml += `</urlset>`;
  res.send(xml);
});


// ==========================================
// VITE AND STATIC SERVING PLATFORM INFRASTRUCTURE
// ==========================================

export default app;

async function startServer() {
  // First, verify and perform Firestore seeding if needed
  try {
    await DbStore.seedIfEmpty();
  } catch (err) {
    console.error("Critical error during cloud data seeding on start:", err);
  }

  if (process.env.NODE_ENV !== "production") {
    // Vite dev server mounting
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production build serves assets compiled in /dist folder
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Development Plus Consult Limited (DPCL) platform server running on http://0.0.0.0:${PORT}`);
  });
}

// Start the server listener only when not running on serverless environments like Vercel
if (!process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  startServer();
}
