import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
        <div class="content" tabindex="0">
            <h2 class="content__heading">Your Favorite</h2>
            <div id="restaurants" class="restaurants">
        
            </div>
        </div>
      `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurant();
    const restaurantsContainer = document.querySelector('#restaurants');

    if (restaurants.length === 0) {
      restaurantsContainer.innerHTML = '<p class="restaurant-item__not__found">Tidak ada restoran untuk ditampilkan</p>';
    } else {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML +=
        createRestaurantItemTemplate(restaurant);
      });
    }
  },
};

export default Favorite;
