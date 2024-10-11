class RestaurantsList extends HTMLElement {
    _shadowRoot = null;
    _style = null;
    _column = 3;
    _gutter = 16;

    static get observedAttributes() {
        return ['column', 'gutter'];
    }

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._style = document.createElement('style');
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: block;
                width: 100%;
                padding: 16px;
                box-sizing: border-box;
            }
            h1 {
                font-size: 3em;
                text-align: center;
                color: var(--color-primary);
            }
    
    
            .restaurant-list {
                margin: 0 25px;
                margin-bottom: 5rem;
                display: grid;
                grid-template-columns: repeat(${this._column}, 1fr);
                gap: ${this._gutter}px;
            }
    
            restaurant-item {
                display: flex;
                flex-direction: column;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                transition: transform 0.2s;
            }
    
            restaurant-item:hover {
                transform: scale(1.05);
            }
    
            @media screen and (max-width: 768px) {
                .restaurant-list {
                    margin-top: 7rem;
                    grid-template-columns: 1fr;
                }
            }
      `;
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    async _fetchRestaurants() {
        try {
            const response = await fetch('/data/DATA.json');
            const data = await response.json();
            this._render(data.restaurants);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    }

    _render(restaurants) {
        this._emptyContent();
        this._shadowRoot.appendChild(this._style);

        this._shadowRoot.innerHTML += `
            <h1>Explore Restaurants</h1>
        `;

        const restaurantList = document.createElement('div');
        restaurantList.classList.add('restaurant-list');

        restaurants.forEach((restaurant) => {
            const restaurantItem = document.createElement('restaurant-item');
            restaurantItem.restaurant = restaurant;
            restaurantList.appendChild(restaurantItem);
        });

        this._shadowRoot.appendChild(restaurantList);
    }

    connectedCallback() {
        this._updateStyle();
        this._fetchRestaurants();
    }
}

customElements.define('restaurants-list', RestaurantsList);