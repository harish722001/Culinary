const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors());
app.use(bodyParser.json({ limit: '12mb'}))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/health-check', (req, res)=>{
    res.send('Server is uppp....')
})

app.get('/getall', (req, res) => {
    res.end('this is getall')
})

module.exports = app