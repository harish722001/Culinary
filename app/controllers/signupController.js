const AppError = require('../utils/appError');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const moment = require('moment');


module.exports = async (req, res, next) => {
    try {
        const { email, password, name, role } = req.body
        if (!email || !password) {
            return next(
                new AppError(401, "fail", "Username or Password missing"),
                req,
                res,
                next
            );
        }
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(email)) {
            return next(
                new AppError(422, "fail", "Invalid e-mail address"),
                req,
                res,
                next
            );
        }
        const findUser = await user.findOne({ email: email });
        if (!findUser) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const today = moment();
            const formattedDate = today.format("DD-MM-YYYY");
            const newUser = await user.create({
                email: email,
                password: hashedPassword,
                username: name,
                role: role,
                creation_date: formattedDate
            });
            res.send({
                "status": 200,
                "message": "signup successful",
                "id": newUser._id
            });
        }
        else {
            return next(
                new AppError(401, "fail", "User Already exists in db"),
                req,
                res,
                next
            );
        }
    }
    catch (err) {
        next(err);
    }
};