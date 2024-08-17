const tagRepository = require("../repositories/tagRepository");
const getTagsByBlogId = async ({ blogId }) => {
  return await tagRepository.getTagsByBlogId({ blogId });
};
module.exports = { getTagsByBlogId };
