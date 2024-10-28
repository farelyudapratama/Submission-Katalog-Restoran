import RestaurantDBSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render () {
    return `
            <hero-element></hero-element>
            <div class="restaurant-container">
            <h1 tabindex="0">Explore Restaurants</h1>
                <div class="restaurants" id="restaurants">
                </div>
            </div>
        `;
  },

  async afterRender () {
    // Fungsi ini akan dipanggil setelah render()
    let restaurants = [];
    try {
      restaurants = await RestaurantDBSource.home();
      console.log('Restaurants:', restaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }

    const restaurantsContainer = document.querySelector('#restaurants');
    if (Array.isArray(restaurants)) {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    } else {
      console.error('Restaurants is not an array:', restaurants);
    }
  }
};

export default Home;
