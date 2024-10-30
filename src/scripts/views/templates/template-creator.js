import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="restaurant-detail" tabindex="0" aria-label="Details of restaurant ${
  restaurant.name
}">
    <div class="restaurant-header">
      <img alt="Image of ${
  restaurant.name
} restaurant" crossorigin="anonymous" src="${
  `${CONFIG.BASE_IMAGE_URL  }large/${  restaurant.pictureId}`
}">
      <div class="restaurant-info">
        <h2>${restaurant.name}</h2>
        <p class="city" aria-label="City: ${restaurant.city}">${
  restaurant.city
}</p>
        <p class="address" aria-label="Address: ${restaurant.address}">${
  restaurant.address
}</p>
        <div class="rating-detail" aria-label="Rating: ${
  restaurant.rating
} stars">
          <span class="rating-value">${restaurant.rating}</span>
          <span>&#9733;</span>
        </div>
        <div class="categories">
          ${restaurant.categories
    .map(
      (category) =>
        `<span class="category" aria-label="Category: ${category.name}">${category.name}</span>`
    )
    .join('')}
        </div>

      </div>
    </div>
    <div class="restaurant-description" tabindex="0">
      <p>${restaurant.description}</p>
    </div>
    <div class="restaurant-menus">
      <h3>Menus</h3>
      <div class="menu-section">
        <h4>Foods</h4>
        <ul>
          ${restaurant.menus.foods
    .map(
      (food) =>
        `<li aria-label="Food item: ${food.name}">${food.name}</li>`
    )
    .join('')}
        </ul>
      </div>
      <div class="menu-section">
        <h4>Drinks</h4>
        <ul>
          ${restaurant.menus.drinks
    .map(
      (drink) =>
        `<li aria-label="Drink item: ${drink.name}">${drink.name}</li>`
    )
    .join('')}
        </ul>
      </div>
    </div>
    <div class="restaurant-reviews">
    ${createReviewFormTemplate()}
      <h3>Customer Reviews</h3>
      ${restaurant.customerReviews
    .map(
      (review) => `
        <div class="review">
          <p><strong>${review.name}</strong>, <span>${review.date}</span></p>
          <p>${review.review}</p>
        </div>
      `
    )
    .join('')}
    </div>
  </div>
`;

const createReviewFormTemplate = () => `
  <div class="review-form">
    <h3>Submit Your Review</h3>
    <form id="reviewForm" class="reviewForm">
      <div>
        <label for="reviewerName">Name:</label>
        <input type="text" id="reviewerName" placeholder="Your name" required aria-label="Your name">
      </div>
      <div>
        <label for="reviewContent">Review:</label>
        <textarea id="reviewContent" placeholder="Write your review" required aria-label="Your review"></textarea>
      </div>
      <button type="submit" aria-label="Submit your review">Submit</button>
    </form>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item" tabindex="0" role="article" aria-label="Restaurant ${
  restaurant.name
}, located in ${restaurant.city} with a rating of ${restaurant.rating} stars">
    <a href="#/detail/${
  restaurant.id
}" class="restaurant-link" aria-label="Link to ${
  restaurant.name
} detail page">
      <div class="image-container">
        <img alt="Image of ${
  restaurant.name
} restaurant" crossorigin="anonymous"
         src="${`${CONFIG.BASE_IMAGE_URL  }small/${  restaurant.pictureId}`}">
        <div class="city-tag" aria-label="City: ${restaurant.city}">${
  restaurant.city
}</div>
      </div>
      <div class="content">
        <div class="rating" aria-label="Rating: ${restaurant.rating} stars">
          <span class="rating-value">${restaurant.rating}</span>
          <span>&#9733;</span>
        </div>
        <h2 tabindex="0">${restaurant.name}</h2>
        <p tabindex="0">${restaurant.description}</p>
      </div>
    </a>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantDetailTemplate,
  createRestaurantItemTemplate,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
};
