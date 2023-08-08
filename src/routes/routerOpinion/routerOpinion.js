const { Router } = require("express");
const { handleOpinions } = require("../../handlers/opinion/handleOpinion");

const routerOpinion = Router();

routerOpinion.get("/", handleOpinions)

module.exports = routerOpinion;