const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mongoConnect = require('./utils/mongoConnect')
const loginRouter = require('./routes/loginRoute')
const restaurantRouter = require('./routes/restaurantRoute')
const dishesRouter = require('./routes/dishesRoute')
const errorhandler = require('./controllers/errorController')

mongoConnect()
app.use(cors());
app.use(bodyParser.json({ limit: '12mb'}))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/health-check', (req, res)=>{
    res.send('Server is uppp....')
})

app.get('/getall', (req, res) => {
    console.log(req)
    res.end('this is getall')
})

// Routes
app.use('/api/v1.0/login', loginRouter)
app.use('/api/v1.0/restaurant', restaurantRouter)
app.use('/api/v1.0/dishes', dishesRouter)
//Global error handler
app.use(errorhandler)

module.exports = app