const { Router } = require("express");
const {
  createComment,
  deleteComment,
  getCommentsByBlogId,
  modifyComment,
} = require("../controllers/commentController");

const commentRoutes = Router();

commentRoutes.post("", createComment);
commentRoutes.get("", getCommentsByBlogId);

//

commentRoutes.delete("/:commentId", deleteComment);
commentRoutes.put("/:commentId", modifyComment);
module.exports = { commentRoutes };
