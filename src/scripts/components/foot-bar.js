class FootBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  static observedAttributes = ['name'];

  _updateStyle() {
    this._style.textContent = `
        :host {
          display: block;
          width: 100%;
          position: sticky;
          text-align: center;
        }
  
        .footer-content {
          font-size: 2em;
        }
      `;
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name' && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    this._shadowRoot.innerHTML = '';
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);

    this._shadowRoot.innerHTML += `
        <div class="footer-content">
          Copyright &copy; 2024 - Resto Zone
        </div>
      `;
  }
}

customElements.define('foot-bar', FootBar);
