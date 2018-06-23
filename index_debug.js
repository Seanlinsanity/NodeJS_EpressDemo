const startupDebugger = require('debug')('app:startup') //a function
const dbDebugger = require('debug')('app:db')
const express = require('express')
const morgan = require('morgan')

const app = express()

if (app.get('env') === 'development') {
    app.use(morgan('short'))
    startupDebugger('Morgan enabled...') //use debugging message to replace console.log
}

//DB work..
dbDebugger('Connected to the database')

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Listening on port ' + port + '...')
})