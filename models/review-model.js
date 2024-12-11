const pool = require('../database/')

/* ***************************
 *  Get all inventory items details by inventory_id
 * ************************** */
async function getReviewsById(inv_id, account_id) {
    try {
        // Convert undefined to NULL for SQL
        const accountId = account_id === undefined ? null : account_id
        const sql = `SELECT * 
            FROM public.review AS i
            JOIN public.inventory AS c 
            ON i.inv_id = c.inv_id
            LEFT JOIN public.account AS x
            ON i.account_id = x.account_id
            WHERE i.inv_id = $1 AND (i.account_id = $2 OR $2 IS NULL)`
        const data = await pool.query(sql, [inv_id, accountId])
        return data.rows
    } catch (error) {
        console.error('getReviewsById error ' + error)
    }
}

/* ***************************
 *  Add a new Review to the database
 * ************************** */
async function addCustomerReview(inv_id, account_id, review_text) {
    try {
        const sql = 'INSERT INTO review (inv_id, account_id, review_text) VALUES ($1, $2, $3) RETURNING *'
        return await pool.query(sql, [inv_id, account_id, review_text])
    } catch (error) {
        console.error('Database Error:', error.message)
        return error.message
    }
}

module.exports = {
    getReviewsById,
    addCustomerReview,
}
