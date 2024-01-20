const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const loginRouter = require('./routes/loginRoute')

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
app.use('/login', loginRouter)

module.exports = app