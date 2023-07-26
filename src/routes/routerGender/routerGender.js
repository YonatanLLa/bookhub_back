const { Router } = require("express");
const getHandleAllGender = require("../../handlers/gender/handleGender");

const routerGender = Router();

routerGender.get("/", getHandleAllGender);

module.exports = routerGender;