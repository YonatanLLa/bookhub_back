const { Router } = require("express");
const { getHandleAllComment, postHandleComment, handleMyComment } = require("../../handlers/comment/handleComment");

const routerComment = Router()

routerComment.get("/", handleMyComment)
routerComment.get("/:id", getHandleAllComment)
routerComment.post("/", postHandleComment)

module.exports = routerComment;