const commentService = require("../service/commentService");

const createComment = async (req, res) => {
  try {
    const { authorId, content, blogId } = req.body;
    const comment = commentService.createComment({
      blogId,
      authorId,
      content,
    });
    res.status(200).json({ comment });
  } catch {
    res.send(500).json({ error: "Failed to create comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = commentService.deleteComment({
      commentId,
    });
    res.status(200).json({ comment });
  } catch {
    res.send(500).json({ error: "Failed to create comment" });
  }
};

const modifyComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    console.log("eee", commentId, content);
    const comment = commentService.modifyComment({
      commentId,
      content,
    });
    res.status(200).send();
  } catch {
    res.send(500).json({ error: "Failed to create comment" });
  }
};

const getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comment = await commentService.getCommentsByBlogId({
      blogId,
    });
    res.status(200).json({ comment });
  } catch {
    res.send(500).json({ error: "Failed to create comment" });
  }
};

module.exports = {
  createComment,
  deleteComment,
  modifyComment,
  getCommentsByBlogId,
};
