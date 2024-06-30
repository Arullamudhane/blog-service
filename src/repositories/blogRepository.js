const { pool } = require("../config/database");

const createBlog = async (blogData) => {
  const { title, content, duration, isPremium } = blogData;
  const result = pool.query(``);
};

module.exports = { createBlog };
