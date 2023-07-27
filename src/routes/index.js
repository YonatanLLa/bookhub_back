const { Router } = require("express");
const routesBook = require("./routerBook/routesBook");
const routerAuthor = require("./routerAutor/routerAuthor");
const routerGender = require("./routerGender/routerGender");
const routerUser = require("./routerUser/routerUser");
const routerFilter = require("./routerFilter/routerFilter");
const routerGoogle = require("./routerGoogle/routerGoogle");
const routerLoginNormal = require("./routerLoginNormal/routerLoginNormal");
const routerGoogleAuth = require("./routerGoogleAuth/routerGoogleAuth");

const routes = Router();

routes.use("/book", routesBook);
routes.use("/author", routerAuthor);
routes.use("/gender", routerGender);
routes.use("/user", routerUser)
routes.use("/filter", routerFilter)
routes.use("/login", routerLoginNormal)
routes.use("/login/google", routerGoogleAuth)
routes.use("/", routerGoogle)

module.exports = routes;
