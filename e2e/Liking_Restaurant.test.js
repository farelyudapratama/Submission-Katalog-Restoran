Feature('Liking Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/favorite');
  });
  
Scenario('showing empty liked restaurants',  ({ I }) => {
    I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

// Scenario('liking one restaurant', async ({ I }) => {
//     I.amOnPage('/');
//     I.waitForElement('.restaurant-item', 5);
    
//     I.click(locate('.restaurant-link').first());
    
//     I.seeElement('#likeButton');
//     I.click('#likeButton');
    
//     I.amOnPage('/#/favorite');
//     I.seeElement('.restaurant-item');
// });

// Scenario('liking a restaurant', async ({ I }) => {
//     I.amOnPage('/');
//     I.waitForElement('.restaurant-item', 5);
    
//     I.click(locate('.restaurant-link').first());
    
//     I.seeElement('#likeButton');
//     I.click('#likeButton');
    
//     I.amOnPage('/#/favorite');
    
//     I.waitForElement('.restaurant-item', 5);
//     I.seeElement('.restaurant-item');
    
//     I.see('Melting Pot', '.restaurant-item__name');
// });

// Scenario('unliking a restaurant', async ({ I }) => {
//     I.amOnPage('/#/favorite');
    
//     I.waitForElement('.restaurant-item', 5);
    
//     I.click(locate('.unlike-button').first());
    
//     I.amOnPage('/#/favorite');
    
//     I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
// });

Scenario('liking a restaurant then cancel it', async ({ I }) => {
    I.amOnPage('/');
    I.waitForElement('.restaurant-item', 5);
    I.click(locate('.restaurant-link').first());
    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/#/favorite');
    I.seeElement('.restaurant-item');
    I.click(locate('.restaurant-link').first());
    I.seeElement('#likeButton');
    I.click('#likeButton');
    
    I.amOnPage('/#/favorite');
    I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('reviewing a restaurant', async ({ I }) => {
    I.amOnPage('/');
    I.waitForElement('.restaurant-item', 5);
    I.click(locate('.restaurant-link').first());
    I.seeElement('#reviewForm');
    I.fillField('#reviewerName', 'Test')
    I.fillField('#reviewContent', 'Mantap e2e');
    I.click("#submitReview");

    I.amOnPage('/');
    I.waitForElement('.restaurant-item', 5);
    I.click(locate('.restaurant-link').first());
    I.see('Test', '.review__name');
    I.see('Mantap e2e', '.review__content');
});