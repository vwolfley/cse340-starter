// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require('../utilities/')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build details by InventoryID view
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryID));

module.exports = router;
