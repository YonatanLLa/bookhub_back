const { Router } = require("express");
const { handlePuntuation, handleCreatePuntuation } = require("../../handlers/punctuation/handlePunctuation");

const routerPuntuation = Router();

routerPuntuation.get("/:id", handlePuntuation)
routerPuntuation.post("/", handleCreatePuntuation)

module.exports = routerPuntuation;