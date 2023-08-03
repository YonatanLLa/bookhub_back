const { Router } = require("express");
const {
	postHandlerSign,
	postHandlerUser,
	getHandlerUser,
} = require("../../handlers/user/handleUser");
const { handlerPurchasesMadeByTheUser } = require("../../handlers/user/handlerPurchasesMadeByTheUser");
const { handlerUserPublishedBooks } = require("../../handlers/user/handlerUserPublishedBooks");
const { 
	   handleSuspendUser, 
	   handleDeleteUser, 
	   handleUnsuspendUser, 
	   handleAdminUser
	} = require("../../handlers/user/handleDarkboard");

const routerUser = Router();

routerUser.get("/", getHandlerUser);
routerUser.get("/buys", handlerPurchasesMadeByTheUser);
routerUser.get("/myBooks/:id", handlerUserPublishedBooks);
routerUser.post("/",postHandlerUser );
routerUser.post("/sign", postHandlerSign);
// suspender, quitar suspension y eliminar
routerUser.put("/:id/suspend", handleSuspendUser)
routerUser.delete("/:id", handleDeleteUser);
routerUser.put("/:id/unsuspend", handleUnsuspendUser);
//convertir admin
routerUser.put("/:id/admin", handleAdminUser);

module.exports = routerUser;
