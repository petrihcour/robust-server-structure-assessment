const uses = require("../data/uses-data");
const methodNotAllowed = require("../errors/methodNotAllowed");

// *** USE RECORDS THROUGH API ARE NOT ALLOWED! USE RECORDS ARE CREATED AS SIDE EFFECT OF A 'GET' REQUEST TO /URLS/:URLID

// *** Time Property, Use Date.now() to assign the time property of uses.




// MIDDLEWARE - If a PUT request is made on /uses/:useId, error message should read: "errors: specificMethod not allowed on specificPath", 405 method not allowed 


// use mergeparams to GET /urls/:urlId/uses to Retrieve a list of use metrics for a given short URL ID



// GET /uses Retrieve a list of all use metrics
function list(req, res, next) {
    const urlId = Number(req.params.urlId);
    const urlUses = uses.filter(urlId ? (use) => use.urlId == urlId : () => true);
    res.json({ data: urlUses });
}

function validateUseId(req, res, next) {
    const useId = Number(req.params.useId);
    const foundUseId = uses.find(use => use.id === useId);
    if (foundUseId) {
        res.locals.use = foundUseId;
        return next();
    } 
    next({
        status: 404, 
        message: `Use ID not found: ${useId}`
    })
}


// GET /uses/:useId retrieve use metric by specified ID.
function read(req, res, next) {
    res.json({ data: res.locals.use })
}

// POST 
// MIDDLEWARE - If a POST request is made on /uses, error message should read: "errors: specificMethod not allowed on specificPath", 405 method not allowed 
function create(req, res, next) {
    methodNotAllowed(req, res, next);
}


// DELETE /uses/:useId Delete a use metric by ID, Status 204 No Content 
function destroy(req, res, next) {
    const useId = Number(req.params.useId)
    const index = uses.findIndex((use) => use.id === useId);
    if (index > -1) {
        uses.splice(index, 1);
    }
    res.sendStatus(204);
}

module.exports = {
    list,
    read: [validateUseId, read],
    delete: [validateUseId, destroy],
    methodNotAllowed,
};