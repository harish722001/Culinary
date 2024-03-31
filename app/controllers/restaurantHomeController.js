const AppError = require('../utils/appError');
const restaurant = require('../models/restaurant');

module.exports = async (req, res, next) => {
    try {

        let restaurants
        try {
            restaurants = await restaurant.find({
                status: 1
            }, {
                _id: 1,
                name: 1,
                address: 1,
                cuisine_type: 1,
                average_timetaken: 1,
                priceforone: 1,
                rating: 1
            }).sort({
                last_modified_on: -1
            })
        } catch (err) {
            return (
                new AppError(500,"Db operation failed",err),
                req,
                res, 
                next
            )
        }

        if (restaurants.length>0) {
            res.send({
                "status": 200,
                "message": "Restaurants Fetched",
                "data": restaurants
            })
        } else {
            res.send({
                "status": 204,
                "message": "No Restaurants Found",
            })
        }

    } catch (err) {
        return (next(new AppError(
            500,
            'Internal server error',
            err
        )), req, res, next)
    }
}