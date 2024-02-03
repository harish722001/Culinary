
const AppError = require('../utils/appError')
const user = require('../models/user')

module.exports = async (req, res, next) => {
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
        //check in db
        const thisuser = user.findOne({email});
        if (!thisuser) {
            return next(new AppError(401, "fail", "Invalid email or password"));
        }
        const passwordMatch = await bcrypt.compare(password,thisuser.password);
        if (!passwordMatch) {
            return next(new AppError(401, "fail", "Invalid email or password"));
        }
        //token generation to be done
        res.send({
            "status": 200,
            "message": "login successful",
            "userID": userId
        })
        
    } catch (err) {
        next(err);
    }
};