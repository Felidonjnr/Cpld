import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept and handle benign browser-extension errors (like MetaMask extension clashes inside sandbox iframes)
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    const msg = event.message || '';
    if (msg.toLowerCase().includes('metamask') || msg.toLowerCase().includes('ethereum') || msg.toLowerCase().includes('wallet')) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    if (reason && typeof reason === 'object') {
      const msg = reason.message || '';
      if (msg.toLowerCase().includes('metamask') || msg.toLowerCase().includes('ethereum') || msg.toLowerCase().includes('wallet')) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
