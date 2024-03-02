const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const newRestaurantController = require('../controllers/newRestaurantController')

router.post('/new-restaurant', auth, newRestaurantController);
// router.get('/my-restaurants', );

module.exports = router;