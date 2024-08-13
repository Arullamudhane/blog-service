const blogRepository = require("../repositories/blogRepository");

const createBlog = async (req, res) => {
  await blogRepository.createBlog(req.body);
  res.send("Home");
};

const updateBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    // Pass both req.body and blogId as an object
    await blogRepository.updateBlog({ ...req.body, blogId });

    return res.status(200).json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the blog." });
  }
};

module.exports = {
  createBlog,
  updateBlog,
};
