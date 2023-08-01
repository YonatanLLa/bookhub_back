const { Router } = require("express");
const { getHandlePerfil, getHandleProduct, getHandleMyBuys } = require("../../handlers/perfil/handlePerfil");

const routerPerfil = Router()

routerPerfil.get("/", getHandlePerfil)
routerPerfil.get("/myBooks", getHandleProduct)
routerPerfil.get("/buys", getHandleMyBuys)
routerPerfil.get("/editar", getHandleMyBuys);



module.exports = routerPerfil;