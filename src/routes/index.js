const { Router } = require("express");
const routesBook = require("./routesBook");


const routes = Router();

routes.use("/book", routesBook);


module.exports = routes;
