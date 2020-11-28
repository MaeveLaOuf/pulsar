const express = require('express')
const router = require('./router')

const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

const port = process.env.PORT || 666;

app.use(express.static(path.join(__dirname + '/src/', 'resources')))
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(router)

app.listen(port, () => console.log('PULSAR is running on port ' + port))