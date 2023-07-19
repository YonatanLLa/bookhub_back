const { Router } = require("express");
const {
	getHandlerBook,
	postHandlerBook,
	deleteHandlerBook,
} = require("../../handles/book/handlerBook");
const { getBookById } = require("../../handles/bookById/handlerBookById");

const routesBook = Router();

routesBook.get("/", getHandlerBook);
routesBook.get("/:id", getBookById);
routesBook.post("/", postHandlerBook);
routesBook.delete("/:id", deleteHandlerBook);

module.exports = routesBook;
