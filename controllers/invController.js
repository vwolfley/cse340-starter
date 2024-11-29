const invModel = require('../models/inventory-model')
const utilities = require('../utilities/')

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render('./inventory/classification', {
        title: className + ' vehicles',
        nav,
        grid,
    })
}

/* ***************************
 *  Build details by InventoryID view
 * ************************** */
invCont.buildByInventoryID = async function (req, res, next) {
    const inv_id = req.params.inventoryId
    const data = await invModel.getInventoryById(inv_id)
    const grid = await utilities.buildDetailsGrid(data)
    let nav = await utilities.getNav()
    const className = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`
    res.render('./inventory/details', {
        title: className,
        nav,
        grid,
    })
}

/* ***************************
 *  Build Inventory Management view
 * ************************** */
invCont.buildByInvManagement = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render('./inventory/management', {
        title: 'Inventory Management',
        nav,
        errors: null,
    })
}

/* ***************************
 *  Build Add Classification view
 * ************************** */
invCont.buildByAddClassification = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render('./inventory/add-classification', {
        title: 'Add Classification Management',
        nav,
        errors: null,
    })
}

/* ***************************
 *  Process Add Classification
 * ************************** */
invCont.addClassification = async function (req, res, next) {
    let nav = await utilities.getNav()
    const { classification_name } = req.body

    // Capitalize the first letter of the classification_name
    const word = classification_name
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    const regResult = await invModel.addClassification(capitalized)

    // const regResult = await invModel.addClassification(classification_name)

    if (regResult) {
        req.flash('success', `Success, ${capitalized} has been added to the database.`)
        res.status(201).render('./inventory/add-classification', {
            title: 'Add Classification Management',
            nav,
            errors: null,
        })
    } else {
        req.flash('notice', 'Sorry, the registration failed.')
        res.status(501).render('./inventory/add-classification', {
            title: 'Add Classification Management',
            nav,
            errors: null,
        })
    }
}

/* ***************************
 *  Build Add Inventory view
 * ************************** */
invCont.buildByAddInventory = async function (req, res, next) {
    let nav = await utilities.getNav()
    res.render('./inventory/add-inventory', {
        title: 'Add Inventory Management',
        nav,
        errors: null,
    })
}

module.exports = invCont
