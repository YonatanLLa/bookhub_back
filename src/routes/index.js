const { Router } = require("express");
const routesBook = require("./routerBook/routesBook");
const routerAuthor = require("./routerAutor/routerAuthor");
const routerGender = require("./routerGender/routerGender");
const routerUser = require("./routerUser/routerUser");
const routerFilter = require("./routerFilter/routerFilter");
const routerCarrito = require("./routerCarrito/routerCarrito");

const routes = Router();

routes.use("/book", routesBook);
routes.use("/author", routerAuthor);
routes.use("/gender", routerGender);
routes.use("/user", routerUser)
routes.use("/filter", routerFilter)
routes.use("/carts", routerCarrito)

module.exports = routes;
