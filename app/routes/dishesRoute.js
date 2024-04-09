const express = require('express');
const router = express.Router();
const {auth} =require('../middlewares/auth')
const addDishController = require('../controllers/addDishController')
const editDishController = require('../controllers/editDishController')

router.post('/add-dish/:restaurantId', auth, addDishController)
router.put('/edit-dish/:restaurantId/:dishId', auth, editDishController)
//delete dish needs to be added

module.exports = router