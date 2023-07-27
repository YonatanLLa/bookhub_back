const { Router } = require("express");
const {
	postHandlerSign,
	postHandlerUser,
} = require("../../handlers/user/handleUser");

const routerUser = Router();

routerUser.post("/",postHandlerUser );
routerUser.post("/sign", postHandlerSign);

module.exports = routerUser;
