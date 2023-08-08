const {Router} = require("express");

const {
	getAllComprasById,
	getHandleAllCompras,
	handleAllCompras,
	getAllComprasReviews
} = require("../../handlers/getHandleAllCompras/getHandleAllCompras.js");

const routerCompras = Router();

routerCompras.get("/", getHandleAllCompras);
routerCompras.get("/reviews", getAllComprasReviews);
routerCompras.get("/all", handleAllCompras);
routerCompras.get("/:id", getAllComprasById);

module.exports = routerCompras;