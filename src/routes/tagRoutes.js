const { Router } = require("express");
const { getTagsByBlogId } = require("../controllers/tagController");

const tagRoutes = Router();

tagRoutes.get("", getTagsByBlogId);

//

// commentRoutes.delete("/:commentId", deleteComment);
// commentRoutes.put("/:commentId", modifyComment);
module.exports = { tagRoutes };
