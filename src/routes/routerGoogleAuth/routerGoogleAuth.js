const { Router } = require("express");
const handleGoogleAuth = require("../../handlers/loginAuth/handleLoginAuth");

const routerGoogleAuth = Router()

routerGoogleAuth.post("/", handleGoogleAuth)

module.exports = routerGoogleAuth;