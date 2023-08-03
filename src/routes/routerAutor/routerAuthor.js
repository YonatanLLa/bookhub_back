const { Router } = require("express");
const {getHandleAllAuthor, postHandleAuthor, putHandleAuthor, deleteHandleAuthor} = require("../../handlers/author/handleAuthor");

const routerAuthor = Router()

routerAuthor.get("/", getHandleAllAuthor)
routerAuthor.post("/", postHandleAuthor)
routerAuthor.put("/:name", putHandleAuthor)
routerAuthor.delete("/:name", deleteHandleAuthor)

module.exports = routerAuthor;