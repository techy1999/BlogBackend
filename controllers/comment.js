const Blog = require("../models/blog");
const Comment = require("../models/comment");
const mongoose = require("mongoose");

exports.createComment = async (req, res, next) => {
  const userLogged = req.user;
  let blogId = req.params.blogId;
  //   blogId = new mongoose.Types.ObjectId(blogId);
  //   console.log("userLogged", userLogged);
  const { content } = req.body;
  console.log("content", content, blogId);

  try {
    // First check if the user is same whose blog is
    // if same then he can not comment
    const blog = await Blog.findOne({ _id: blogId });

    if (blog && blog.author == userLogged._id) {
      return res.status(400).json({
        success: false,
        message: "you can not comment on own blog",
      });
    }
    const comment = await Comment.create({
      content,
      author: userLogged,
      blog: blogId,
    });

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create comment",
      error: error.message,
    });
  }
};

exports.getCommentsByBlogId = async (req, res, next) => {
  const { blogId } = req.params;
  console.log("blogId", blogId);
  try {
    const comments = await Comment.find({ blog: blogId })
      .populate("author", "name email")
      .sort("-created_at");

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get comments",
      error: error.message,
    });
  }
};
