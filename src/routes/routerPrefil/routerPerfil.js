const { Router } = require("express");
const {
	getHandlePerfil,
	getHandleProduct,
	getHandleMyBuys,
	handleEdithProfile,
} = require("../../handlers/perfil/handlePerfil");

const routerPerfil = Router()

routerPerfil.get("/", getHandlePerfil)
routerPerfil.get("/myBooks", getHandleProduct)
routerPerfil.get("/buys", getHandleMyBuys)
routerPerfil.put("/editar", handleEdithProfile);



module.exports = routerPerfil;