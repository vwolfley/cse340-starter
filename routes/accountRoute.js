// Needed Resources
const express = require('express')
const router = new express.Router()
const utilities = require('../utilities/')
const accountController = require('../controllers/accountController')

// Route to build Login View
router.get('/login', utilities.handleErrors(accountController.buildLogin))

// Route to build Registration View
router.get('/registration', utilities.handleErrors(accountController.buildRegistration))

module.exports = router
