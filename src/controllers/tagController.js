const tagService = require("../service/tagService");
const getTagsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.body;
    const tags = await tagService.getTagsByBlogId({
      blogId,
    });
    res.status(200).send(tags);
  } catch {
    res.send(500).json({ error: "Failed to create comment" });
  }
};

module.exports = { getTagsByBlogId };
