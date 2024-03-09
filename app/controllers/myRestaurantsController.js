const AppError = require('../utils/appError');
const restaurant = require('../models/restaurant');
const e = require('express');

module.exports = async (req, res, next) => {
    try {
        const userId = req.headers['userid']
        console.log('userId = ', userId)
        if (!userId) {
            return next(new AppError(
                422,
                "fail",
                "UserId is missing"))
        }
        let myRestaurants
        try {
            myRestaurants = await restaurant.find({
                user_id: userId,
            }, {
                _id: 1,
                name: 1,
                address: 1,
                status: 1,
                rating: 1
            }).sort({
                last_modified_on: -1
            })
        } catch (err) {
            return (new AppError(
                500,
                "Db operation failed",
                err
            ))
        }

        if (myRestaurants.length>0) {
            res.send({
                "status": 200,
                "message": "Restaurants Fetched",
                "data": myRestaurants
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
        )))
    }
}