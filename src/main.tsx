import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App.tsx';
import './index.css';

// Add smooth scrolling behavior for anchor links
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const anchor = target.closest('a');
  
  if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
    const url = new URL(anchor.href);
    
    // Check if the link points to the current page
    if (url.origin === window.location.origin && url.pathname === window.location.pathname) {
      const targetElement = document.querySelector(anchor.hash);
      
      if (targetElement) {
        e.preventDefault();
        
        // Use window.scrollTo with smooth behavior
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY,
          behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        window.history.pushState(null, '', anchor.hash);
      }
    }
  }
});

// Handle smooth scrolling when navigating to a page with a hash
window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY,
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to ensure React has rendered the content
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
);
