const express = require('express')
const router = express.Router()
const ControllerMail = require('../controllers/mail')


router
    .post('/', ControllerMail.create)




module.exports = router