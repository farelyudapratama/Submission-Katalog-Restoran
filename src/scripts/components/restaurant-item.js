class RestaurantItem extends HTMLElement {
  _restaurant = {
    id: null,
    name: null,
    description: null,
    pictureId: null,
    city: null,
    rating: null
  };

  constructor () {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  set restaurant (restaurant) {
    this._restaurant = restaurant;
    this.render();
  }

  get restaurant () {
    return this._restaurant;
  }

  _updateStyle () {
    this._style.textContent = `
      :host {
        display: block;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        overflow: hidden;
        background-color: var(--color-white);
      }
      .restaurant-item {
        display: flex;
        flex-direction: column;
      }
      .image-container {
        position: relative;
        padding-top: 56.25%;
      }
      .image-container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .city-tag {
        position: absolute;
        top: 10px;
        left: 10px;
        background-color: #fff;
        font-size: 1.5em;
        padding: 5px 10px;
        border-radius: 4px;
        font-weight: bold;
      }
      .content {
        padding: 16px;
      }
      .rating {
        display: flex;
        align-items: center;
        font-size: 2em;
      }
      .rating-value {
        font-weight: bold;
        margin-right: 5px;
      }
      h2 {
        margin: 0 0 8px 0;
        font-size: 1.5em;
        color: #333;
      }
      p {
        margin: 0;
        color: #666;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      @media screen and (max-width: 768px) {
        .image-container {
          position: relative;
          padding-top: 36.25%;
        }
      }
    `;
  }

  _emptyContent () {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback () {
    this.render();
  }

  render () {
    this._emptyContent();
    this._updateStyle();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
      <div class="restaurant-item" tabindex="0" role="article" aria-label="Restaurant ${this._restaurant.name}, located in ${this._restaurant.city} with a rating of ${this._restaurant.rating} stars">
        <div class="image-container">
          <img src="${this._restaurant.pictureId}" alt="Image of ${this._restaurant.name} restaurant">
          <div class="city-tag" aria-label="City: ${this._restaurant.city}">${this._restaurant.city}</div>
        </div>
        <div class="content">
          <div class="rating" aria-label="Rating: ${this._restaurant.rating} stars">
            <span class="rating-value">${this._restaurant.rating}</span>
            <span>&#9733;</span>
          </div>
          <h2 tabindex="0">${this._restaurant.name}</h2>
          <p tabindex="0">${this._restaurant.description}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
