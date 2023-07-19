const { Router } = require("express");
const postHandlerUser = require("../../handles/user/handleUser");

const routerUser = Router();

routerUser.post("/",postHandlerUser );

module.exports = routerUser;
