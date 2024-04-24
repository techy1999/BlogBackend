// Importing model
const Blog = require("../models/blog");

exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    //Checking if user already like it
    if (blog.likes.includes(req.user.id)) {
      return res
        .status(400)
        .json({ succes: false, message: "Blog already liked" });
    }
    //add user to blogs document and saving
    blog.likes.push(req.user.id);
    await blog.save();
    res.json({ success: true, messsage: blog });
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
