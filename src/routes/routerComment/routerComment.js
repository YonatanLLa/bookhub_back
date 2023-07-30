const { Router } = require("express");
const { getHandleAllReview, postHandleReview } = require("../../handlers/comment/handleComment");

const routerComment = Router()

routerComment.get("/:id", getHandleAllReview)
routerComment.post("/", postHandleReview)

module.exports = routerComment;