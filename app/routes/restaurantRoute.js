const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const newRestaurantController = require('../controllers/newRestaurantController')
const myRestaurantController = require('../controllers/myRestaurantsController')

router.post('/new-restaurant', auth, newRestaurantController);
router.get('/my-restaurants', auth, myRestaurantController);

module.exports = router;