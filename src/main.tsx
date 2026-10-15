import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

// Automatically register and update PWA service worker
registerSW({
  immediate: true,
  onNeedRefresh() {
    // Optional: auto reload on SW update
  },
  onOfflineReady() {
    console.log('Dulingo омода барои истифодаи 100% офлайн мебошад');
  },
});

createRoot(document.getElementById('root')!).render(<App />);
