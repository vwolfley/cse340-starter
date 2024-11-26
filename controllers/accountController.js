const utilities = require('../utilities/')

const accountController = {}

/* ****************************************
 *  Deliver Login view
 * *************************************** */
accountController.buildLogin = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render('./account/login', {
        title: 'Login',
        nav,
    })
}

/* ****************************************
 *  Deliver Registration view
 * *************************************** */
accountController.buildRegistration = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render('./account/registration', {
        title: 'Registration',
        nav,
    })
}

module.exports = accountController
