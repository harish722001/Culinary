const order = require('../models/order')
const AppError = require('../utils/appError')


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
        const restaurantId = req.body['restaurant_id']
        if (!restaurantId) {
            return next(
                new AppError(422, "fail", "restaurantId is missing"),
                req,
                res,
                next
            )
        }

        req.body.user_id = userId
        req.body.created_on = Date.now()
        req.body.status = "pending"
        const newOrder = new order(req.body)
        let createdOrder
        try {
            createdOrder = await newOrder.save()
        } catch (err) {
            return next(
                new AppError(500, "Db operation failed", err),
                req,
                res,
                next
            )
        }
        res.send({
            status: 200,  
            message: "Order created successfully",
            data: createdOrder  
        })
    } catch (err) {
        next(err)
    }
}