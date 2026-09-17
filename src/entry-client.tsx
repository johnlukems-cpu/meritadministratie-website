import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('#root ontbreekt in index.html');

// Markeert dat JS actief is; scroll-reveal-animaties zijn alleen dan ingeschakeld.
document.documentElement.classList.add('js');

// Base path ('' op het custom domain, '/meritadministratie-website' op github.io)
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Geprerenderde HTML (productie) → hydrateren; lege root (dev) → renderen.
// Let op: in dev bevat #root alleen de <!--app-html--> placeholder-comment,
// daarom kijken we naar element-kinderen en niet naar hasChildNodes().
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
