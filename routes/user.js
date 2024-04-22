const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const createUserController = require("../controllers/user");
// Importing model
const { isAuthenticatedUser } = require("../middleware/auth");
const { rateLimiter } = require("../middleware/rateLimiter");
// Login route /blog/ POST -> Create
router.post("/login", rateLimiter,createUserController.login);

// Register route /blog/ GET -> To get Blogs
router.post("/register",rateLimiter, createUserController.register);

// Profile route /blog/ GET -> To get Blogs
router.get("/profile", rateLimiter, isAuthenticatedUser, createUserController.profile);

// Profile route /blog/ GET -> To get Blogs
router.patch(
  "/profile",
  isAuthenticatedUser,
  createUserController.updateProfile
);

module.exports = router;
