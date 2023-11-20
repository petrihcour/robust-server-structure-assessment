const router = require("express").Router({ mergeParams: true });
const controller = require("./uses.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


// use mergeparams to GET /urls/:urlId/uses to Retrieve a list of use metrics for a given short URL ID

module.exports = router;