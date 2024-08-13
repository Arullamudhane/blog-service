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
const deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    // Pass both req.body and blogId as an object
    const rowsAffected = await blogRepository.deleteBlog(blogId);
    if (rowsAffected === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the blog." });
  }
};

const getBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await blogRepository.getBlog(blogId);
    return res.status(200).json(blog);
  } catch {
    return res
      .status(500)
      .json({ error: "An error occurred while getting the blog." });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
};
