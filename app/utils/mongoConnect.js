const mongoose = require('mongoose')

const mongoAtlasUri = require('../config/config')['mongodbUri']

console.log('mongo atlas uri', mongoAtlasUri)

module.exports = () => {
    try {
        // Connect to the MongoDB cluster
        console.log('connecting to mongodb...')
        mongoose.connect(mongoAtlasUri, )
    } catch (e) {
        console.log("Mongoose connection failed")
    }
    const dbConnection = mongoose.connection
    dbConnection.on("error", (err) => console.log(`Connection error ${err}`))
    dbConnection.on("disconnected", () => console.log('Mongodb disconnected!'))
    dbConnection.once("open", () => console.log("Connected to DB!"))
}