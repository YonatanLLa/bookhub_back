const { Router } = require("express");
const { 
       handlePuntuation, 
       handleCreatePuntuation, 
       handleMyPuntuation, 
       handleTopPuntuation } = require("../../handlers/punctuation/handlePunctuation");

const routerPuntuation = Router();
// puntuancion
routerPuntuation.get("/", handleMyPuntuation)
// 
routerPuntuation.get("/top", handleTopPuntuation)
routerPuntuation.get("/:id", handlePuntuation)
routerPuntuation.post("/", handleCreatePuntuation)

module.exports = routerPuntuation;