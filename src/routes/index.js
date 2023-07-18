const { Router } = require("express");
const routerAuthor = require("./routerAutor/routerAuthor");
const routerGender = require("./routerGender/routerGender");

const routes = Router();

routes.use("/author", routerAuthor);
routes.use("/gender", routerGender);


module.exports = routes;
