// Needed Resources
const express = require('express')
const router = new express.Router()
const utilities = require('../utilities/')
const accountController = require('../controllers/accountController')
const regValidate = require('../utilities/account-validation')

// Route to build Login View
router.get('/login', utilities.handleErrors(accountController.buildLogin))

// Process the login attempt
router.post(
    '/login',
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
)

// Route to build Registration View
router.get('/registration', utilities.handleErrors(accountController.buildRegistration))

// Route to handle Registration
router.post(
    '/registration',
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

// Route to build Account Management View
router.get('/', utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))


// app.get('/', (req, res) => {
//     const clientLoggedIn = req.session.isLoggedIn || false; // Example check
//     const clientName = req.session.clientName || 'Guest';   // Example name
//     res.render('header', { clientLoggedIn, clientName });
//   });
  

module.exports = router
