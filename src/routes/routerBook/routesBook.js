const { Router } = require("express");
const {
	getHandlerBook,
	postHandlerBook,
	deleteHandlerBook,
	putHandlerBook,
} = require("../../handlers/book/handlerBook");
const { getBookById } = require("../../handlers/bookById/handlerBookById");
const { handleSuspendBook, handleUnsuspendBook } = require("../../handlers/book/handleDashBoard");

const routesBook = Router();

routesBook.get("/", getHandlerBook);
routesBook.get("/:id", getBookById);
routesBook.post("/", postHandlerBook);
routesBook.delete("/:id", deleteHandlerBook);
routesBook.put("/:id", putHandlerBook);
// borrado logico de libro
routesBook.put("/:id/suspend", handleSuspendBook)
routesBook.put("/:id/unsuspend", handleUnsuspendBook);


module.exports = routesBook;

