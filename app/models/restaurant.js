const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    alternate_number: {
        type: String
    },
    email: {
        type: String
    },
    cuisine_type: {
        type: [String]
    },
    average_timetaken: {
        type: String
    },
    priceforone: {
        type: String
    },
    address: {
        type: {
            address_main: {
                type: String,
                required: true
            },
            locality: {
                type: String
            },
            landmark: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            pincode: {
                type: Number
            },
            location_coordinates: {
                type: {
                    latitude: {
                        type: String
                    },
                    longitude: {
                        type: String
                    }
                }
            }
        },
        required: true
    },
    unique_id: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Number,
        required: true
    },
    dishes: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                description: {
                    type: String
                },
                price: {
                    type: Number,
                    required: true
                },
                status: {
                    type: Number,
                    required: true
                },
                availability_count: {
                    type: Number
                },
                serves: {
                    type: String
                },
                last_modified_on: {
                    type: Date
                },
                rating: {
                    type: Number
                }
            }
        ]
    },
    rating: {
        type: Number
    },
    last_modified_on: {
        type: Date
    },
    created_on: {
        type: Date
    }
})

module.exports = mongoose.model('restaurant', restaurantSchema)