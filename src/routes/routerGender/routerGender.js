const { Router } = require("express");
const {getHandleAllGender, postHandleGender, putHandleGender, deleteHandleGender} = require("../../handlers/gender/handleGender");

const routerGender = Router();

routerGender.get("/", getHandleAllGender);
routerGender.post("/", postHandleGender)
routerGender.put("/:name", putHandleGender)
routerGender.delete("/:name", deleteHandleGender)

module.exports = routerGender;