const express = require("express");

const app = express();

app.use(express.json());

// TODO: Add code to meet the requirements and make the tests pass.

// ERROR HANDLERS

// Return 404 error for any nonexistent path or resource

// Methods that are not allowed should return 405

module.exports = app;
