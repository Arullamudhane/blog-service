const blogController = require("../repositories/blogRepository");

const createBlog = (req, res) => {
  blogController.createBlog(req.body);
  res.send("Home");
};

module.exports = {
  createBlog,
};
