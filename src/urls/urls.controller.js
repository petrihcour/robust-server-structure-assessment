const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

// GET /urls Retrieve a list of all short URLs
function list(req, res, next) {
  res.send({ data: urls });
}

// POST /urls Create a new short URL, 201 created
// POST { data: {"href":"www.some-url.com"} } to /urls should assign an id to the object, save it, and return the saved object as a response to the client.

//  use array.length + 1 to assign IDs, as follows:
// const newUrlId = urls.length + 1;
// const newUseId = uses.length + 1;

// validate urlId
function validateUrlId(req, res, next) {
  const urlId = Number(req.params.urlId);
  const foundUrl = urls.find(url => url.id === urlId);
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next();
  }
  next({
    status: 404, 
    message: `Url ID not found: ${urlId}`
  });
}

// GET /urls/:urlId Retrieve a short URL by specific ID
// *** USE RECORDS ARE CREATED AS A SIDE EFFECT OF THIS 'GET' REQUEST
function read(req, res, next) {
  res.json({ data: res.locals.url });
}

// PUT /urls/:urlId Update short URL by ID

// DELETE /urls/:urlId deletes specific urlId, 405 Method Not allowed, "errors": "DELETE Method not allowed on /urls/2"

module.exports = {
  list,
  read: [validateUrlId, read],
};
