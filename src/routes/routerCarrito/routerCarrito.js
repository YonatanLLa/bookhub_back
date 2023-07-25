const { Router } = require("express")
const { getAllcarrito, postcarrito } = require("../../handles/carrito/handleCarrito")

const routerCarrito = Router()

routerCarrito.get("/", getAllcarrito)
routerCarrito.post("/", postcarrito)

module.exports = routerCarrito