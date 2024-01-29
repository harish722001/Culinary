const mongoose = require('mongooose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    role: {
        type: String
    },
    creation_date: {
        type: String
    }
})

module.exports = mongoose.model('user', userSchema)