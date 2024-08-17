const { models } = require("../models");

const createTags = async ({ blog, tags }) => {
  if (tags && Array.isArray(tags)) {
    const tagInstances = await Promise.all(
      tags.map((tag) => {
        return models.Tag.findOrCreate({ where: { name: tag } });
      })
    );

    const tagIds = tagInstances.map(([tagInstance]) => tagInstance.id);
    await blog.setTags(tagIds);
  }
};

const getTagsByBlogId = async (blogId) => {
  try {
    // Fetch the tags associated with the specified blog

    // if (!blogId || typeof blogId !== "string") {
    //   console.log("pp", blogId.blogId);
    //   throw new Error("Invalid blog ID provided", blogId);
    // }
    const blogTags = await models.Blog.findOne({
      where: { id: blogId.blogId },
      include: [
        {
          model: models.Tag,
          as: "tags",
          attributes: ["name"], // Fetch the tag name
        },
      ],
    });
    if (!blogTags) {
      throw new Error("Blog not found");
    }

    // Extract and return tag names
    const tags = blogTags.tags.map((blogTag) => blogTag.name);
    return tags;
  } catch (error) {
    console.error("Error fetching tags by blog ID:", error);
    throw new Error("Failed to fetch tags");
  }
};

module.exports = { createTags, getTagsByBlogId };
