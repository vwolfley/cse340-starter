const utilities = require('./')
const { body, validationResult } = require('express-validator')
const inventoryModel = require('../models/inventory-model')
const validate = {}

/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
    return [
        // valid classification is required and cannot already exist in the DB
        body('classification_name')
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 1 })
            .withMessage('Classification does not meet requirements.')
            .custom(async (classification_name) => {
                const ClassificationExists = await inventoryModel.checkExistingClassification(classification_name)
                if (ClassificationExists) {
                    throw new Error('Classification exists. Please enter a different classification')
                }
            }),
    ]
}

/* ******************************
 * Check data and return errors or continue to next
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render('./inventory/add-classification', {
            errors,
            title: 'Add Classification Management',
            nav,
            classification_name,
        })
        return
    }
    next()
}

module.exports = validate
