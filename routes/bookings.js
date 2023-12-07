const express = require('express')
const router = express.Router()
const {booking} = require('../controllers/bookings')

router.route('/').post(booking)

module.exports = router