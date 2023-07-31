const {Router} = require("express");

const {
	getAllComprasById,
	getHandleAllCompras,
} = require("../../handlers/getHandleAllCompras/getHandleAllCompras.js");

const routerCompras = Router();

routerCompras.get("/", getHandleAllCompras);
routerCompras.get("/:id", getAllComprasById);

module.exports = routerCompras;