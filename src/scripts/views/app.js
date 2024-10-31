import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const routes = await import('../routes/routes');
    const page = routes.default[url];
    
    try {
      this._content.innerHTML = await page.render();
      await page.afterRender();

      const skipLinkElem = document.querySelector('.skip-to-content');
      skipLinkElem?.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#explore')?.focus();
      });
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  }
}

export default App;