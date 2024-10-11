class AppBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _isDrawerOpen = false;

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: "open" });
        this._style = document.createElement("style");
    }

    _updateStyle() {
        this._style.textContent = `
        :host {
            display: block;
            width: 100%;
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .appbar {
            background-color: var(--color-dark);
            color: var(--color-white);
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        } 

        .appbar-brand {
            font-family: var(--font-accent);
            font-size: 2em;
            color: var(--color-white);
            text-decoration: none;
        }
        
        .appbar-nav {
            display: flex;
            align-items: center;
        }

        .appbar-nav a {
            margin-left: 20px;
            color: var(--color-white);
            font-size: 1.5em;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .appbar-nav a:hover {
            color: var(--color-accent);
        }

        .menu-toggle {
            display: none;
            background: none;
            border: none;
            color: var(--color-white);
            font-size: 1.5em;
            cursor: pointer;
        }

        .drawer {
            position: fixed;
            top: 0;
            left: -250px;
            width: 250px;
            height: 100%;
            background-color: var(--color-dark);
            transition: left 0.3s ease;
            z-index: 1000;
        }

        .drawer.open {
            left: 0;
        }

        .drawer-nav {
            padding: 20px;
        }

        .drawer-nav a {
            display: block;
            color: var(--color-white);
            font-size: 1.5em;
            text-decoration: none;
            margin-bottom: 15px;
            transition: color 0.3s ease;
        }

        .drawer-nav a:hover {
            color: var(--color-accent);
        }

        .overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }

        @media (max-width: 768px) {
            .appbar-nav {
                display: none;
            }

            .menu-toggle {
                display: block;
            }
        }
        `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = "";
    }

    connectedCallback() {
        this.render();
        this._addEventListeners();
    }

    _addEventListeners() {
        const menuToggle = this._shadowRoot.querySelector('.menu-toggle');
        const overlay = this._shadowRoot.querySelector('.overlay');

        menuToggle.addEventListener('click', () => this._toggleDrawer());
        overlay.addEventListener('click', () => this._toggleDrawer());
    }

    _toggleDrawer() {
        const drawer = this._shadowRoot.querySelector('.drawer');
        const overlay = this._shadowRoot.querySelector('.overlay');

        this._isDrawerOpen = !this._isDrawerOpen;

        if (this._isDrawerOpen) {
            drawer.classList.add('open');
            overlay.style.display = 'block';
        } else {
            drawer.classList.remove('open');
            overlay.style.display = 'none';
        }
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `      
        <div class="appbar">
            <h1 class="appbar-brand">RestoZone</h1>
            <div class="appbar-nav">
                <a href="/">Home</a>
                <a href="#">Favorite</a>
                <a href="https://github.com/farelyudapratama" target="_blank">About Us</a>
            </div>
            <button class="menu-toggle">&#9776;</button>
        </div>
        <div class="drawer">
            <nav class="drawer-nav">
                <a href="/">Home</a>
                <a href="#">Favorite</a>
                <a href="https://github.com/farelyudapratama" target="_blank">About Us</a>
            </nav>
        </div>
        <div class="overlay"></div>
        `;
    }
}

customElements.define("app-bar", AppBar);