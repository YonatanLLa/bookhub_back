const { Router } = require("express");
const {
	getHandlerBook,
	postHandlerBook,
	deleteHandlerBook,
	putHandlerBook,
} = require("../../handles/book/hablderBook");
const { getBookById } = require("../../handles/bookById/handlerBookById");

const routesBook = Router();

routesBook.get("/", getHandlerBook);
routesBook.post("/", postHandlerBook);
routesBook.delete("/:id", deleteHandlerBook);
routesBook.put("/:id", putHandlerBook);

module.exports = routesBook;

