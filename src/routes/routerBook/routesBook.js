const { Router } = require("express");
const {
	getHandlerBook,
	postHandlerBook,
} = require("../../handles/book/hablderBook");

const routesBook = Router();

routesBook.get("/", getHandlerBook);
routesBook.post("/", postHandlerBook);

module.exports = routesBook;
