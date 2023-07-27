const { Router } = require("express");
const {
	postHandlerSign,
	postHandlerUser,
} = require("../../handles/user/handleUser");
const postHandlerUser = require("../../handlers/user/handleUser");

const routerUser = Router();

routerUser.post("/",postHandlerUser );
routerUser.post("/sign", postHandlerSign);

module.exports = routerUser;
