const { restart } = require('nodemon')
const restaurant = require('../models/restaurant')

module.exports = async (req, res, next) => {
    try {
        const userId = req.headers['userid']
        console.log('userId = ', userId)

        req.body.user_id = userId
        req.body.created_on = Date.now()
        req.body.last_modified_on = Date.now()

        const newRestaurant = new restaurant(req.body)
        try {
            const resp = newRestaurant.save()
        } catch(err){
            console.log(err)
        }
        res.send({
            "status": 200,
            "message": "just testing",
        });
    } catch {
        next(err)
    }
}