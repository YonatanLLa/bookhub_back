const { Router } = require("express");
const postHandlerUser = require("../../handlers/user/handleUser");

const routerUser = Router();

routerUser.post("/",postHandlerUser );

module.exports = routerUser;
