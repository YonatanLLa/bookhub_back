const { Router } = require("express");
const loginNormal = require("../../handlers/loginNormal/handleLoginNormal");

const routerLoginNormal = Router();

routerLoginNormal.post("/", loginNormal)

module.exports = routerLoginNormal;