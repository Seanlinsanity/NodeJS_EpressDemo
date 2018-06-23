const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Helloooo From Sean Lin")
})

module.exports = router