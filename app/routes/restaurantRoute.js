const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const newRestaurantController = require('../controllers/newRestaurantController')
const myRestaurantController = require('../controllers/myRestaurantsController')
const restaurantDetailsController = require('../controllers/restaurantDetailsController')
const restaurant = require('../models/restaurant');

router.post('/new-restaurant', auth, newRestaurantController)
router.get('/my-restaurants', auth, myRestaurantController)
router.get('/restaurant-details/:restaurantId', restaurantDetailsController)
//updateRestaurant, deleteRestaurant, restaurantDetails needs to be added

module.exports = router;