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
            .matches(/^[A-Za-z]+$/) // only letters allowed
            .withMessage('Classification does not meet requirements.')
            .customSanitizer((classification_name) => {
                // Capitalize the first letter and lowercase the rest
                return classification_name.charAt(0).toUpperCase() + classification_name.slice(1).toLowerCase()
            })
            .custom(async (classification_name) => {
                const ClassificationExists = await inventoryModel.checkExistingClassification(classification_name)
                if (ClassificationExists) {
                    throw new Error('Classification exists. Please enter a different classification.')
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
        res.render('inventory/add-classification', {
            errors,
            title: 'Add Classification Management',
            nav,
            classification_name,
        })
        return
    }
    next()
}

/*  **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
    return [
        // Classification is required
        body('classification_id').trim().escape().notEmpty().withMessage('Classification does not meet requirements.'),
        // year is required and must be a 4-digit number
        body('inv_year')
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 4, max: 4 }) // Ensure exactly 4 characters
            .matches(/^\d{4}$/) // Matches exactly 4 numeric digits
            .withMessage('Year must be a 4-digit number.'),

        // make is required
        body('inv_make')
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage('Please enter a valid make.')
            .customSanitizer((inv_make) => {
                // Capitalize the first letter of each word
                return inv_make
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')
            }),
        // model is required
        body('inv_model')
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage('Please enter a valid model.')
            .customSanitizer((inv_model) => {
                // Capitalize the first letter of each word
                return inv_model
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')
            }),
        // color is required
        body('inv_color')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('A color is required.')
            .customSanitizer((inv_color) => {
                // Capitalize the first letter of each word
                return inv_color
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join(' ')
            }),
        // miles is required and must be a number with at least 3 digits
        body('inv_miles')
            .trim()
            .escape()
            .notEmpty()
            .isNumeric()
            .withMessage('Miles must be a number.')
            .matches(/^\d{3,}$/) // Matches only digits with a minimum of 3
            .withMessage('Miles must be a number with at least 3 digits.'),

        // price is required and must be a number with at least 3 digits
        body('inv_price')
            .trim()
            .escape()
            .notEmpty()
            .isNumeric()
            .withMessage('Miles must be a number.')
            .matches(/^\d{3,}$/) // Matches only digits with a minimum of 3
            .withMessage('Price must be a number with at least 3 digits.'),

        // description is required
        body('inv_description').trim().escape().notEmpty().withMessage('Description must not be empty.'),
    ]
}

/* ******************************
 * Check data and return errors or continue to next
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { inv_year, inv_make, inv_model, inv_color, inv_miles, inv_price, inv_description } =
        req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render('inventory/add-inventory', {
            errors,
            title: 'Add Inventory Management',
            nav,
            inv_year,
            inv_make,
            inv_model,
            inv_color,
            inv_miles,
            inv_price,
            inv_description,
        })
        return
    }
    next()
}

module.exports = validate
