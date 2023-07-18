const { Router } = require("express");
const routerAuthor = require("./routerAutor/routerAuthor");

const routes = Router();

routes.use("/author", routerAuthor);


module.exports = routes;
