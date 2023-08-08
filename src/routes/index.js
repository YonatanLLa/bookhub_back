const { Router } = require("express");
const routesBook = require("./routerBook/routesBook");
const routerAuthor = require("./routerAutor/routerAuthor");
const routerGender = require("./routerGender/routerGender");
const routerUser = require("./routerUser/routerUser");
const routerFilter = require("./routerFilter/routerFilter");
const routerPayment = require("./routerPayment/routerPayment");
// const routerCarrito = require("./routerCarrito/routerCarrito");
const routerGoogle = require("./routerGoogle/routerGoogle");
const routerLoginNormal = require("./routerLoginNormal/routerLoginNormal");
const routerPerfil = require("./routerPrefil/routerPerfil");
const routerComment = require("./routerComment/routerComment");
const routerPuntuation = require("./routerPuntuation/routerPuntuation");
const routerCompras = require("./routerCompras/routerCompras");
const routerOpinion = require("./routerOpinion/routerOpinion");

const routes = Router();

routes.use("/book", routesBook);
routes.use("/author", routerAuthor);
routes.use("/gender", routerGender);
routes.use("/user", routerUser)
routes.use("/filter", routerFilter)
routes.use("/", routerPayment);
routes.use("/login", routerLoginNormal)
routes.use("/", routerGoogle)
routes.use("/perfil", routerPerfil)
routes.use("/comments", routerComment)
routes.use("/punctuation", routerPuntuation)
routes.use("/compras", routerCompras)
routes.use("/opinion", routerOpinion)
// routes.use("/carts", routerCarrito)

module.exports = routes;
