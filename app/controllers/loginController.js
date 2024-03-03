
const AppError = require('../utils/appError');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const {verifyEmailFormat} = require('../utils/commonFunctions')

module.exports = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(
                new AppError(401, "fail", "Username or Password missing"),
                req,
                res,
                next
            );
        }
        const verifyEmail = await verifyEmailFormat(email)
        if (!verifyEmail) {
            return next(
                new AppError(422, "fail", "Invalid e-mail address"),
                req,
                res,
                next
            );
        }
        //check in db
        console.log(email)
        const thisuser = await user.findOne({ email: email });
        if (!thisuser) {
            console.log("email does not exist...");
            return next(new AppError(401, "fail", "Invalid email or password"));
        }
        else {
            try {
                console.log("email exists...");
                const passwordMatch = await bcrypt.compare(password, thisuser.password);
                if (!passwordMatch) {
                    return next(new AppError(401, "fail", "Invalid email or password"));
                }
                //jwt token generation to be done
                res.send({
                    "status": 200,
                    "message": "login successful",
                    "id": thisuser._id
                });
            }
            catch (error) {
                console.error('Error comparing passwords:', error);
                throw new AppError(500, 'Internal server error', 'An error occurred during authentication.');
            }
        }


    } catch (err) {
        next(err);
    }
};