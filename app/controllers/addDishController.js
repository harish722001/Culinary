const AppError = require('../utils/appError');
const restaurant = require('../models/restaurant');

module.exports = async (req, res, next) => {
    try {
        const userId = req.headers['userid']
        console.log('userId = ', userId)
        if (!userId) {
            return next(
                new AppError(422, "fail", "UserId is missing"),
                req,
                res,
                next
            )
        }

        const { restaurantId } = req.params
        if (!restaurantId) {
            return next(
                new AppError(422, "fail", "restaurantId is missing"),
                req,
                res,
                next
            )
        }

        req.body.last_modified_on = Date.now()
        if (!req.body.status) {
            req.body.status = 1
        }
        let newDish
        try {
            newDish = await restaurant.updateOne(
                { _id: restaurantId },
                { $set: {last_modified_on: req.body.last_modified_on}},
                { $push: { dishes: req.body } }
            )
        } catch (err) {
            return (
                new AppError(500, "Db operation failed", err),
                req,
                res,
                next
            )
        }

        if (newDish.matchedCount === 1) {
            res.send({
                "status": 200,
                "message": "Dish added",
                "data": newDish
            })
        } else {
            res.send({
                "status": 204,
                "message": "No restaurant found with this Id",
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