const { Router } = require("express");
const { handleOpinions, handleIdOpinion } = require("../../handlers/opinion/handleOpinion");

const routerOpinion = Router();

routerOpinion.get("/", handleOpinions)
routerOpinion.get("/:id", handleIdOpinion)

module.exports = routerOpinion;