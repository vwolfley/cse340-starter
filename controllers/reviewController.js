const invModel = require('../models/inventory-model')
const reviewModel = require('../models/review-model')
const utilities = require('../utilities/')

const revCont = {}

/* ***************************
 *  Add Customer Review
 * ************************** */
revCont.addCustomerReview = async function (req, res, next) {
    const { inv_id, account_id, review_text } = req.body
    // console.log(req.body)

    const regResult = await reviewModel.addCustomerReview(inv_id, account_id, review_text)
    const data = await invModel.getInventoryById(inv_id)
    const reviewData = await reviewModel.getReviewsById(inv_id)
    const customerReviews = await utilities.buildReviews(reviewData)
    const grid = await utilities.buildDetailsGrid(data)
    let nav = await utilities.getNav()
    const className = `${data[0].inv_year} ${data[0].inv_make} ${data[0].inv_model}`

    if (regResult) {
        req.flash('success', `Success, your review has been added.`)
        res.render('inventory/details', {
            title: className,
            nav,
            grid,
            customerReviews,
            inv_id,
            account_id,
            errors: null,
        })
    } else {
        req.flash('notice', 'Sorry, adding inventory failed.')
        res.render('inventory/details', {
            title: className,
            nav,
            grid,
            customerReviews,
            inv_id,
            account_id,
            errors: null,
        })
    }
}


/* ***********************
 * Deliver Update Review View
 *************************/
revCont.updateReviewView = async function (req, res) {
    let nav = await utilities.getNav()
    const accountData = await reviewModel.getReviewsByIdOnly(req.params.account_id)
    res.render('review/edit-review', {
        title: 'Edit Review',
        nav,
        accountData,
        errors: null,
    })
}

module.exports = revCont
