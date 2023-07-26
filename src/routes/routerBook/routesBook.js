const { Router } = require("express");
const {
	getHandlerBook,
	postHandlerBook,
	deleteHandlerBook,
	putHandlerBook,
} = require("../../handlers/book/handlerBook");
const { getBookById } = require("../../handlers/bookById/handlerBookById");

const routesBook = Router();

routesBook.get("/", getHandlerBook);
routesBook.get("/:id", getBookById);
routesBook.post("/", postHandlerBook);
routesBook.delete("/:id", deleteHandlerBook);
routesBook.put("/:id", putHandlerBook);

module.exports = routesBook;

