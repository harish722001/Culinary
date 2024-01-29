
const AppError = require('../utils/appError')
const user = require('../models/user')

module.exports = (req, res, next) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
             return next(
                new AppError(401, "fail", "Username or Password missing"),
                req,
                res,
                next
             );
        }

        res.send({
            "status": 200,
            "message": "login successful",
            "userID": userId
        })
        
    } catch (err) {
        next(err);
    }
};