const { Router } = require("express");
const getHandleAllAuthor = require("../../handles/author/handleAuthor");

const routerAuthor = Router()

routerAuthor.get("/", getHandleAllAuthor)

module.exports = routerAuthor;