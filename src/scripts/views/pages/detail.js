import { createRestaurantDetailTemplate } from '../templates/template-creator';
import RestaurantDBSource from '../../data/restaurantdb-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render () {
    return `
      <div id="restaurant-detail" class="restaurant-detail"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender () {
    // const urlParts = window.location.hash.split('/');
    // const restaurantId = urlParts[urlParts.length - 1];

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantId = url.id;
    // const data = await RestaurantDBSource.detail(restaurantId);
    // const restaurantContainer = document.querySelector('#restaurant-detail');
    // restaurantContainer.innerHTML = createRestaurantDetailTemplate(data.restaurant);

    if (restaurantId) {
      try {
        const data = await RestaurantDBSource.detail(restaurantId);
        if (!data.error && data.restaurant) {
          const restaurantDetailElement = document.getElementById('restaurant-detail');
          restaurantDetailElement.innerHTML = createRestaurantDetailTemplate(data.restaurant);

          LikeButtonInitiator.init({
            likeButtonContainer: document.getElementById('likeButtonContainer'),
            restaurant: {
              id: data.restaurant.id,
              name: data.restaurant.name,
              description: data.restaurant.description,
              pictureId: data.restaurant.pictureId,
              city: data.restaurant.city,
              rating: data.restaurant.rating,
              food: data.restaurant.menus.foods,
              drink: data.restaurant.menus.drinks
            }
          });
        } else {
          console.error('Failed to fetch restaurant details:', data.message);
          document.getElementById('restaurant-detail').innerHTML = '<p>Failed to load restaurant details.</p>';
        }
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        document.getElementById('restaurant-detail').innerHTML = '<p>Error loading restaurant details. Please try again later.</p>';
      }
    } else {
      console.error('No restaurant ID provided');
      document.getElementById('restaurant-detail').innerHTML = '<p>No restaurant ID provided.</p>';
    }
  }
};

export default Detail;
