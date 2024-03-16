const AppError = require('../utils/appError')
const restaurant = require('../models/restaurant');

module.exports = async (req, res, next) => {
    const { restaurantId } = req.params

    if (!restaurantId) {
        return next(
            new AppError(422, "fail", "restaurantId is missing"),
            req,
            res,
            next
        );
    }
    let restaurantDetails
    try {
        restaurantDetails = await restaurant.findOne({
            _id: restaurantId,
        })
    } catch (err) {
        return (
            new AppError(500, "Db operation failed", err),
            req,
            res,
            next
        )
    }

    res.send({
        "status": 200,
        "message": "Restaurant Details Fetched",
        "data": restaurantDetails
    })

}