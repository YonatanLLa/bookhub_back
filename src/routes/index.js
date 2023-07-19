const { Router } = require("express");
<<<<<<< HEAD
const routesBook = require("./routesBook");


const routes = Router();

routes.use("/book", routesBook);
=======
const routerAuthor = require("./routerAutor/routerAuthor");
const routerGender = require("./routerGender/routerGender");

const routes = Router();

routes.use("/author", routerAuthor);
routes.use("/gender", routerGender);
>>>>>>> origin/dev_ricardo


module.exports = routes;
