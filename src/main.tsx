import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { initReveal } from './lib/reveal.ts';
import { initAnim } from './lib/anim.ts';
import { initNavSpy } from './lib/navspy.ts';
import './index.css';

const dispose = [initReveal(), initAnim(), initNavSpy()];

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => dispose.forEach((fn) => fn()));
}