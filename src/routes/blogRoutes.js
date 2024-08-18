const { Router } = require("express");
const blogController = require("../controllers/blogController");
const validationMiddleware = require("../middlewares/validationMiddleware");

const blogRoutes = Router();

blogRoutes.post(
  "/create",
  // validationMiddleware.validateCreateUser,
  blogController.createBlog
);

blogRoutes.put(
  "/:id",
  // validationMiddleware.validateCreateUser,
  blogController.updateBlog
);

blogRoutes.delete(
  "/:id",
  // validationMiddleware.validateCreateUser,
  blogController.deleteBlog
);

blogRoutes.get(
  "/:id",
  // validationMiddleware.validateCreateUser,
  blogController.getBlog
);

blogRoutes.get(
  "",
  // validationMiddleware.validateCreateUser,
  blogController.getBlogByTags
);
module.exports = { blogRoutes };

blogRoutes.post(
  "/:id/like",
  // validationMiddleware.validateCreateUser,
  blogController.likeBlog
);

blogRoutes.post(
  "/:id/dislike",
  // validationMiddleware.validateCreateUser,
  blogController.dislikeBlog
);
