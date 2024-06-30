const { Router } = require("express");
const blogController = require("../controllers/blogController");
const validationMiddleware = require("../middlewares/validationMiddleware");

const blogRoutes = Router();

blogRoutes.post(
  "/create",
  validationMiddleware.validateCreateUser,
  blogController.createBlog
);

module.exports = { blogRoutes };
