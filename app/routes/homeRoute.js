const express = require('express');
const router = express.Router();
const {auth} =require('../middlewares/auth')
const restaurantHomeController = require('../controllers/restaurantHomeController')

router.get('/restaurant/', auth, restaurantHomeController)

module.exports = router