const express = require('express');
const router = express.Router();
const addOrderController = require('../controllers/addOrderController')
const {auth} =require('../middlewares/auth')


router.post('/add-order', auth, addOrderController);


module.exports = router;