const { Router } = require("express");
const { handlePuntuation, handleCreatePuntuation, handleMyPuntuation } = require("../../handlers/punctuation/handlePunctuation");

const routerPuntuation = Router();

routerPuntuation.get("/", handleMyPuntuation)
routerPuntuation.get("/:id", handlePuntuation)
routerPuntuation.post("/", handleCreatePuntuation)

module.exports = routerPuntuation;