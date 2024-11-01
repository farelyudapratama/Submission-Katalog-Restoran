class HeroElement extends HTMLElement {
  _style = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
            :host {
                display: block;
                width: 100%;
            }
            .hero {
                width: 100%;
                height: 90vh;
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                overflow: hidden;
            }
            .hero::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 100px;
                background: linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0));
                aria-hidden: true;
            }
            .hero-content {
                text-align: center;
                color: white;
                padding: 40px;
                border-radius: 10px;
                transform: translateY(20px);
                opacity: 0;
                animation: fadeIn 1s ease-out forwards;
                z-index: 1;
            }
            @keyframes fadeIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            h1 {
                font-family: var(--font-accent), sans-serif;
                font-size: 4em;
                margin-bottom: 0.3em;
                letter-spacing: 2px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }
            p {
                font-family: 'Roboto', sans-serif;
                font-size: 1.8em;
                font-weight: 300;
                margin-bottom: 1.5em;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }
            .cta-button {
                font-family: 'Roboto', sans-serif;
                font-size: 1em;
                font-weight: 400;
                color: white;
                background-color: var(--color-primary);
                padding: 12px 30px;
                border: none;
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-block;
            }
            .cta-button:hover {
                background-color: #c0392b;
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }
            
            @media (max-width: 768px) {
                .hero-content {
                    padding: 0 20px;
                }
                h1 {
                    font-size: 3em;
                }
                p {
                    font-size: 1em;
                }
                .cta-button {
                    font-size: 1em;
                }
            }

            @media (max-height: 600px) {
                .hero::after {
                    height: 30px;
                }
                .hero-content {
                    padding: 20px;
                }
                .cta-button {
                    display: none;
                }
            }

            @media only screen and (max-width: 650px) {
                .hero {
                    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(/images/hero-image_2-small.jpg);
                }
            }

            @media only screen and (min-width: 651px) {
                .hero {
                    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(/images/hero-image_2-large.jpg);
                }
            }

            @media (min-width: 1200px) {
                .hero {
                    width: 1000px;
                    height: 50vh;
                    margin: auto;
                }
                .hero::after {
                    height: 80px;
                }
                .hero-content {
                    background-color: transparent;
                    box-shadow: none;
                    padding: 60px;
                }
                h1 {
                    font-size: 5em;
                }
                p {
                    font-size: 1.8em;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
                }
                .cta-button {
                    display: none;
                }
            }
        `;
  }

  connectedCallback() {
    this.render();
    const ctaButton = this.shadowRoot.querySelector('.cta-button');
    ctaButton.addEventListener('click', (event) => {
      event.preventDefault();
      const targetSection = document.getElementById('explore');
      if (targetSection) {
        const offset = 100;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } else {
        console.error('Element with ID "explore" not found.');
      }
    });
  }

  render() {
    this._updateStyle();
    this.shadowRoot.appendChild(this._style);

    this.shadowRoot.innerHTML += `
            <div class="hero">
                <div class="hero-content" tabindex="0">
                    <h1>Discover Culinary Delights</h1>
                    <p>Explore a world of exquisite flavors and unforgettable dining experiences in your area.</p>
                    <a href="#explore" class="cta-button" role="button" aria-label="Explore restaurants section">Explore Restaurants</a>
                </div>
            </div>
        `;
  }
}

customElements.define('hero-element', HeroElement);
