
const AppError = require('../utils/appError')

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
        
    } catch (err) {
        next(err);
    }
};