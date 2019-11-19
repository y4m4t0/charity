const express = require('express')
const router = express.Router()

const userController = require('./controllers/user')
const fundsController = require('./controllers/funds')

// authentication routes
router.post('/api/register', userController.register)
router.post('/api/login', userController.login)

// funds related routes
router.get('/api/getFunds', fundsController.getFunds)
router.post('/api/getSubscriptions', fundsController.getFundsSubsribes)

module.exports = router