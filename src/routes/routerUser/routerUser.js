const { Router } = require("express");
const {
	postHandlerSign,
	postHandlerUser,
	getHandlerUser,
} = require("../../handlers/user/handleUser");
const { handlerPurchasesMadeByTheUser } = require("../../handlers/user/handlerPurchasesMadeByTheUser");
const { handlerUserPublishedBooks } = require("../../handlers/user/handlerUserPublishedBooks");

const routerUser = Router();

routerUser.get("/", getHandlerUser);
routerUser.get("/buys", handlerPurchasesMadeByTheUser);
routerUser.get("/myBooks/:id", handlerUserPublishedBooks);
routerUser.post("/",postHandlerUser );
routerUser.post("/sign", postHandlerSign);

module.exports = routerUser;
