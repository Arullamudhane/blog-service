const { pool } = require("../config/databaseByPool");

const createBlog = async (blogData) => {
  const { title, content, duration, isPremium } = blogData;
  const result = pool.query(``);
};

module.exports = { createBlog };
