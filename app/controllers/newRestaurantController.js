const { restart } = require('nodemon')
const AppError = require('../utils/appError');
const restaurant = require('../models/restaurant');
const { verifyEmailFormat } = require('../utils/commonFunctions')
const app = require('..');
const user = require('../models/user');

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
        req.body.user_id = userId

        const requierd = await checkRequiredFields(req.body)
        if (!requierd.check) {
            return (next(new AppError(
                422,
                "Invalid params",
                requierd.message
            )))
        }

        u_name = req.body.name.replace(/\s/g, "").toLowerCase()
        U_address = req.body.address.replace(/\s/g, "").toLowerCase()
        req.body.unique_id = u_name + '_' + U_address
        req.body.created_on = Date.now()
        req.body.last_modified_on = Date.now()
        req.body.status = 1

        const duplicateCheck = await checkDuplicateRestaurant(req.body)

        if (duplicateCheck) {
            return next(new AppError(
                401,
                "fail",
                "Restaurant with same name and address already exists"
            ))
        }

        const newRestaurant = new restaurant(req.body)
        try {
            console.log('saving restaurant...')
            await newRestaurant.save()
        } catch (err) {
            return (next(new AppError(
                500,
                'Internal server error',
                err
            )))
        }
        res.send({
            "status": 200,
            "message": "Restaurant Created",
        });
    } catch (err) {
        return (next(new AppError(
            500,
            'Internal server error',
            err
        )))
    }
}

async function checkDuplicateRestaurant(body) {
    const check = await restaurant.findOne({
        unique_id: body.unique_id
    })
    
    return check
}
async function checkRequiredFields(params) {
    let message

    if (!params.name) {
        message = 'Name is missing'
    } else if (!params.phone_number) {
        message = 'Phone Number is missing'
    } else if (!params.address) {
        message = 'Address is missing'
    }

    //phone number validation needs to be added

    if (params.email) {
        const checkEmail = await verifyEmailFormat(params.email)
        if (!checkEmail) {
            message = 'Invalid e-mail address'
        }
    }

    if (message) {
        return {
            check: false,
            message: message
        }
    } else {
        return {
            check: true,
            message: message
        }
    }
}