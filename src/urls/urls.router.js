const router = require("express").Router();
const controller = require("./urls.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const usesRouter = require("../uses/uses.router");

// List short URL uses, nested route. GET request to /urls/:urlId/uses to be inputted in here 
// if :urlId and :useId are mismatched, the server should respond with 404. use middleware from urls.controller 

router.use("/:urlId/uses", controller.validateUrlId, usesRouter);

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

router.route("/:urlId").get(controller.read).put(controller.update)
.delete(methodNotAllowed)
.all(methodNotAllowed);

module.exports = router;

