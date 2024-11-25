
const utilities = require("../utilities/")
const testController = {};


testController.triggerError = async function (req, res, next) {
  throw new Error();
};

module.exports = testController;



// const baseController = {}

// baseController.buildHome = async function(req, res){
//   const nav = await utilities.getNav()
//   // req.flash("notice", "This is a flash message.")
//   res.render("index", {title: "Home", nav})
// }

// module.exports = baseController