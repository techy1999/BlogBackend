const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const createUserController = require("../controllers/user");
// Importing model
const { isAuthenticatedUser } = require("../middleware/auth");

// Login route /blog/ POST -> Create
router.post("/login", createUserController.login);

// Register route /blog/ GET -> To get Blogs
router.post("/register", createUserController.register);

// Profile route /blog/ GET -> To get Blogs
router.get("/profile", isAuthenticatedUser, createUserController.profile);

// Profile route /blog/ GET -> To get Blogs
router.patch(
  "/profile",
  isAuthenticatedUser,
  createUserController.updateProfile
);

// ContactUs route /contact/ POST -> To create a notification to user and admin.
router.post(
  "/contact-us",
  createUserController.contactUs
);

module.exports = router;
