const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const createPostController = require("../controllers/blog");
const commentController = require("../controllers/comment");
const likeBlogController = require("../controllers/like");

const { isAuthenticatedUser } = require("../middleware/auth");

// Blog route /blog/ POST -> Create
// router.post("/blog", createPostController.createPost);
router
  .route("/blog")
  .post(isAuthenticatedUser, createPostController.createBlog);

router.route("/blog/:blogId").get(createPostController.getSingleBlog);

router
  .route("/blog/:id")
  .put(isAuthenticatedUser, createPostController.updateBlog);

router
  .route("/blog/:id")
  .delete(isAuthenticatedUser, createPostController.deleteBlog);

// Blog route /blog/ GET -> To get Blogs
router.route("/blog").get(createPostController.getAllBlog);

// Blog route /blog/ GET -> To get Blogs
router
  .route("/my-blog")
  .get(isAuthenticatedUser, createPostController.getUserBlog);

// Like a blog
router
  .route("/blog/like/:id")
  .put(isAuthenticatedUser, likeBlogController.likeBlog);

// Comment Routes
router.post(
  "/comments/:blogId",
  isAuthenticatedUser,
  commentController.createComment
);

//Get all user comments on particular blogs.
router.get(
  "/comments/:blogId",
  commentController.getCommentsByBlogId
);

module.exports = router;
