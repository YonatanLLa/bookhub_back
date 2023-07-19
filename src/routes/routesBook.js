const { Router } = require("express");
const { getHandlerBook, postHandlerBook } = require("../handles/hablderBook");

const routesBook = Router();

routesBook.get("/", getHandlerBook);
routesBook.post("/", postHandlerBook);

module.exports = routesBook;