const { Router } = require("express");
const {
	getHandlerBook,
	postHandlerBook,
	deleteHandlerBook,
} = require("../../handles/book/hablderBook");

const routesBook = Router();

routesBook.get("/", getHandlerBook);
routesBook.post("/", postHandlerBook);
routesBook.delete("/:id", deleteHandlerBook);

module.exports = routesBook;
