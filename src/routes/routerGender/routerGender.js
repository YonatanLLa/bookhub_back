const { Router } = require("express");
const getHandleAllGender = require("../../handles/gender/handleGender");

const routerGender = Router();

routerGender.get("/", getHandleAllGender);

module.exports = routerGender;