import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {initReveal} from './lib/reveal.ts';
import './index.css';

const disposeReveal = initReveal();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.dispose(disposeReveal);
}
