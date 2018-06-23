const express = require('express') //express is a function
const morgan = require('morgan')
const logger = require('./middleware/logger')
const courses = require('./routes/courses')
const home = require('./routes/home')

const app = express()

//middleware function
app.use(express.json()) //Be able to get the body for the post request: req.body
app.use(express.urlencoded({ extended: true})) //Be able to read urlencoded format
app.use(express.static('public')) //Be able to read file in public folder by adding "/filename" to route

app.use('/api/courses', courses)
app.use('/', home)

//third-party middleware function
app.use(morgan('short'))

//custom middleware function
app.use(logger)

//enviroment variable "PORT"
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})