const { Router } = require("express");
const routesBook = require("./routerBook/routesBook");
const routerAuthor = require("./routerAutor/routerAuthor");
const routerGender = require("./routerGender/routerGender");

const routes = Router();

routes.use("/book", routesBook);
routes.use("/author", routerAuthor);
routes.use("/gender", routerGender);

module.exports = routes;
