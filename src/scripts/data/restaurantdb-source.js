import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantDBSource {
  static async home () {
    try {
      const response = await fetch(API_ENDPOINT.HOME);
      const data = await response.json();
      // console.log('Data fetched from API:', data);
      if (data && data.restaurants) {
        // console.log('Restaurants data:', data.restaurants);
        return data.restaurants;
      } else {
        // console.warn('No restaurants data found in API response');
        return undefined;
      }
    } catch {
      // console.error('Error fetching data from API:', error);
      return undefined;
    }
  }

  static async detail (id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}

export default RestaurantDBSource;
