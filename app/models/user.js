const mongoose = require('mongoose')

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
    created_on: {
        type: Date
    },
})

module.exports = mongoose.model('user', userSchema)