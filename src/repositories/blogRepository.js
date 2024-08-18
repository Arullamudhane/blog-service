const { models } = require("../models");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

const createBlog = async (blogData) => {
  const { title, subtitle, content, duration, isPremium, authodId } = blogData;

  const blog = await models.Blog.create({
    title,
    subtitle,
    content,
    duration,
    isPremium,
    authorId: "aecb3609-ef9e-47e4-b421-044b8f7581df",
  });

  console.log("hh");
  return blog;

  // const result = pool.query(``);
};

const updateBlog = async (blogData) => {
  const {
    title,
    subtitle,
    content,
    duration,
    isPremium,
    authodId,
    tags,
    blogId,
  } = blogData;

  try {
    const blog = await models.Blog.findByPk(blogId);

    if (!blog) {
      throw new Error("Blog not found");
    }

    // Update the blog
    await blog.update({
      title,
      subtitle,
      content,
      duration,
      isPremium,
    });

    if (tags && Array.isArray(tags)) {
      const tagInstances = await Promise.all(
        tags.map((tag) => models.Tag.findOrCreate({ where: { name: tag } }))
      );

      const tagIds = tagInstances.map(([tagInstance]) => tagInstance.id);
      await blog.setTags(tagIds); // Update blog-tag associations
    }

    return blog;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

const deleteBlog = async (blogId) => {
  try {
    const blog = await models.Blog.findByPk(blogId);

    if (!blog) {
      throw new Error("Blog not found");
    }

    // Update the blog
    const result = await models.Blog.destroy({
      where: {
        id: blogId,
      },
    });

    return result;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

const getBlog = async (blogId) => {
  try {
    const blog = await models.Blog.findByPk(blogId);

    if (!blog) {
      throw new Error("Blog not found");
    }

    return blog;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

const getBlogByTags = async (tagList) => {
  try {
    const blogTags = tagList.split(",");

    console.log("aaaa=", blogTags);
    const blogs = await models.Blog.findAll({
      include: [
        {
          model: models.Tag,
          as: "tags",
          where: {
            name: {
              [Op.in]: blogTags,
            },
          },
          attributes: ["name"],
          through: { attributes: [] },
        },
        { model: models.User, as: "author" },
      ],
      distinct: true, // Avoid duplicate blogs if they have multiple matching tags
      limit: 6,
    });

    if (!blogs) {
      throw new Error("Blog not found");
    }

    return blogs;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

module.exports = { createBlog, updateBlog, deleteBlog, getBlog, getBlogByTags };
