const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});

module.exports = {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.DB_ENV === 'cloud'? process.env.MONGODB_CLOUD : process.env.MONGODB_LOCAL
}