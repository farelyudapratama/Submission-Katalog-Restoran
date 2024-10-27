import 'regenerator-runtime';
import "../styles/main.css";
import "./components/index.js";
import App from './views/app';

document.addEventListener('DOMContentLoaded', () => {
    const appBar = document.querySelector('app-bar').shadowRoot;
    const button = appBar.getElementById('menu-toggle');
    const drawer = appBar.getElementById('drawer');
    const content = document.getElementById('explore');

    const app = new App({
        button,
        drawer,
        content,
    });

    window.addEventListener('hashchange', () => {
        app.renderPage();
    });

    window.addEventListener('load', () => {
        app.renderPage();
    });
});