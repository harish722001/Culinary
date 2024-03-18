const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const addDishController = require('../controllers/addDishController')

router.post('/add-dish/:restaurantId', auth, addDishController)

module.exports = router