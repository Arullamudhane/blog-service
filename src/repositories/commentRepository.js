const { where } = require("sequelize");
const { models } = require("../models");

const createComment = async ({ blogId, authorId, content }) => {
  return await models.Comment.create({ blogId, authorId, content });
};

const deleteComment = async ({ commentId }) => {
  return await models.Comment.destroy({ where: { id: commentId } });
};

const getCommentsByBlogId = async ({ blogId }) => {
  console.log("isss = ", blogId);
  return await models.Comment.findAll({
    where: { blogId },
    order: [["createdAt", "desc"]],
  });
};

const modifyComment = async ({ content, commentId }) => {
  //   console.log("isss = ", blogId);
  return await models.Comment.update({ content }, { where: { id: commentId } });
};

module.exports = {
  createComment,
  deleteComment,
  getCommentsByBlogId,
  modifyComment,
};
