const commentRepository = require("../repositories/commentRepository");

const createComment = async ({ blogId, authorId, content }) => {
  return await commentRepository.createComment({ blogId, authorId, content });
};

const deleteComment = async ({ commentId }) => {
  return await commentRepository.deleteComment({ commentId });
};

const getCommentsByBlogId = async ({ blogId }) => {
  return await commentRepository.getCommentsByBlogId({ blogId });
};

const modifyComment = async ({ content, commentId }) => {
  return await commentRepository.modifyComment({ content, commentId });
};
module.exports = {
  createComment,
  deleteComment,
  getCommentsByBlogId,
  modifyComment,
};
