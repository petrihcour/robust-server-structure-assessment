const uses = require("../data/uses-data");
const methodNotAllowed = require("../errors/methodNotAllowed");

// *** USE RECORDS THROUGH API ARE NOT ALLOWED! USE RECORDS ARE CREATED AS SIDE EFFECT OF A 'GET' REQUEST TO /URLS/:URLID

// *** Time Property, Use Date.now() to assign the time property of uses.


// MIDDLEWARE - If a POST request is made on /uses, error message should read: "errors: specificMethod not allowed on specificPath", 405 method not allowed 

// MIDDLEWARE - If a PUT request is made on /uses/:useId, error message should read: "errors: specificMethod not allowed on specificPath", 405 method not allowed 


// use mergeparams to GET /urls/:urlId/uses to Retrieve a list of use metrics for a given short URL ID



// GET /uses Retrieve a list of all use metrics
function list(req, res, next) {
    res.send({ data: uses });
}


// GET /uses/:useId retrieve use metric by specified ID.
// NOT ALLOWED THROUGH USES POST. ONLY THROUGH URLS/:URLID GET REQ
function create(req, res, next) {
    methodNotAllowed(req, res, next);
}

// DELETE /uses/:useId Delete a use metric by ID, Status 204 No Content 

module.exports = {
    list,
    methodNotAllowed,
};