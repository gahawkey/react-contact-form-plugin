import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('react-contact-form');
  if (container) {
    createRoot(container).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
});