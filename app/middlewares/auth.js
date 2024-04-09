const user = require('../models/user');

const auth = async (req, res, next) => {
    //Implement auth method later
    //temp auth
    try {
        const email = req.headers['email']
        const thisuser = await user.findOne({ email: email });
        if (!thisuser) {
            res.status(401).json({
                message: 'user does not exist'
            });
            return
        }
        req.headers['userid'] = thisuser._id
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}

module.exports = {
    auth
}