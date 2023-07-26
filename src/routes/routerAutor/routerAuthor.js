const { Router } = require("express");
const {getHandleAllAuthor, postHandleAuthor} = require("../../handlers/author/handleAuthor");

const routerAuthor = Router()

routerAuthor.get("/", getHandleAllAuthor)
routerAuthor.post("/", postHandleAuthor)

module.exports = routerAuthor;