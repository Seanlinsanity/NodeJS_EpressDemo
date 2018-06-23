const config = require('config')
const express = require('express') //express is a function
const morgan = require('morgan')

const app = express()


//get the current environment
console.log(`NODE_ENV : ${process.env.NODE_ENV}`)
console.log(`app : ${app.get('env')}`)

if (app.get('env') === 'development') {
    app.use(morgan('short'))
    console.log('Morgan enabled...')
}

// Configuration
console.log('Application Name: ' + config.get('name'))
console.log('Mail Sever: ' + config.get('mail.host'))
console.log('Mail Password: ' + config.get('mail.password'))