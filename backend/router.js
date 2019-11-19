const express = require('express')
const router = express.Router()

const userController = require('./controllers/user')
const fundsController = require('./controllers/funds')
const adminController = require('./controllers/admin')

// authentication routes
router.post('/api/register', userController.register)
router.post('/api/login', userController.login)

// funds related routes
router.get('/api/getFunds', fundsController.getFunds)
router.post('/api/getSubscriptions', fundsController.getFundsSubsribes)

// admin routes
router.get('/api/getUsersList', adminController.shouldBeAdmin, adminController.getUsersList)
router.get('/api/getFundsList', adminController.shouldBeAdmin, adminController.getFundsList)


module.exports = router