const app = require('./app')
const port = require('./app/config/config').port

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})