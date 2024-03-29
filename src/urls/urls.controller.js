const urls = require("../data/urls-data");
const uses = require("../data/uses-data");
const methodNotAllowed = require("../errors/methodNotAllowed");

// GET /urls Retrieve a list of all short URLs
function list(req, res, next) {
  res.send({ data: urls });
}

// POST /urls Create a new short URL, 201 created
// POST { data: {"href":"www.some-url.com"} } to /urls should assign an id to the object, save it, and return the saved object as a response to the client.
// const newUseId = uses.length + 1;
// { "data": { "href": "http://www.toooop.com" } }

function create(req, res, next) {
  const { data: { href } = {} } = req.body;
  const newUrl = {
    id: urls.length + 1,
    href,
  }
  urls.push(newUrl);
  res.status(201).json({ data: newUrl })
}

// missing href 
function hasUrl(req, res, next) {
  const { data: { href } = {} } = req.body;
  if (href) {
    return next();
  }
  next({
    status: 400,
    message: `An 'href' property is required.`
  });
}

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
function createUseRecord(req, res, next) {
  const { url } = res.locals;
  
  // use record as a side effect 
  const newUseRecord = {
    id: uses.length + 1,
    urlId: url.id,
    time: Date.now(),
  }

  uses.push(newUseRecord);
  res.locals.useRecord = newUseRecord;
  next();
}


function read(req, res, next) {
  res.json({ data: res.locals.url });
}

// PUT /urls/:urlId Update short URL by ID
function update(req, res, next) {
  const { url } = res.locals;
  const { data: { href } = {} } = req.body;
  
  url.href = href;
  
  res.json({ data: url });
}


// DELETE /urls/:urlId deletes specific urlId, 405 Method Not allowed, "errors": "DELETE Method not allowed on /urls/2"
function destroy(req, res, next) {
  methodNotAllowed(req, res, next);
}

module.exports = {
  create: [hasUrl, create],
  list,
  read: [validateUrlId, createUseRecord, read],
  update: [validateUrlId, update],
  validateUrlId,
  methodNotAllowed,
};
