const router = require("express").Router();
const controller = require("./urls.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const usesRouter = require("../uses/uses.router");

// List short URL uses, nested route. GET request to /urls/:urlId/uses to be inputted in here 
// if :urlId and :useId are mismatched, the server should respond with 404. use middleware from urls.controller 

router.route("/").get(controller.list);

module.exports = router;

