import 'regenerator-runtime';
import '../styles/main.css';
import swRegister from './utils/sw-register';

// Fungsi untuk memuat komponen secara dinamis
const loadComponents = async () => {
  await import('./components/index.js'); // Dynamic import untuk komponen
};

// Fungsi untuk memuat App secara dinamis
const loadApp = async () => {
  const { default: App } = await import('./views/app'); // Dynamic import
  return App;
};

document.addEventListener('DOMContentLoaded', async () => {
  // Memuat komponen secara dinamis
  await loadComponents(); // Memuat komponen terlebih dahulu

  const appBar = document.querySelector('app-bar').shadowRoot;
  const button = appBar.getElementById('menu-toggle');
  const drawer = appBar.getElementById('drawer');
  const content = document.getElementById('explore');

  const App = await loadApp(); // Memanggil fungsi untuk memuat App
  const app = new App({
    button,
    drawer,
    content
  });

  window.addEventListener('hashchange', () => {
    app.renderPage();
  });

  window.addEventListener('load', () => {
    app.renderPage();
  });

  swRegister();
});
