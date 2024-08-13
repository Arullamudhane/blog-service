const { pool } = require("../config/databaseByPool");
const { models } = require("../models");

const createBlog = async (blogData) => {
  const { title, subtitle, content, duration, isPremium, authodId, tags } =
    blogData;
  await models.Blog.create({
    title,
    subtitle,
    content,
    duration,
    isPremium,
    authorId: "aecb3609-ef9e-47e4-b421-044b8f7581df",
  });

  const blog = await models.Blog.create({
    title,
    subtitle,
    content,
    duration,
    isPremium,
    authorId: "aecb3609-ef9e-47e4-b421-044b8f7581df",
  });

  if (tags && Array.isArray(tags)) {
    const tagInstances = await Promise.all(
      tags.map((tag) => {
        return models.Tag.findOrCreate({ where: { name: tag } });
      })
    );

    console.log(tagInstances);

    const tagIds = tagInstances.map(([tagInstance]) => tagInstance.id);
    await blog.setTags(tagIds);
  }
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

module.exports = { createBlog, updateBlog, deleteBlog, getBlog };
