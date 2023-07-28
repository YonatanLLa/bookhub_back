const { Router } = require("express");
const {
	postHandlerSign,
	postHandlerUser,
	getHandlerUser,
} = require("../../handlers/user/handleUser");

const routerUser = Router();

routerUser.get("/", getHandlerUser);
routerUser.post("/",postHandlerUser );
routerUser.post("/sign", postHandlerSign);

module.exports = routerUser;
