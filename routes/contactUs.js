const express = require("express");
const router = express.Router();
const createUserController = require("../controllers/user");
// Importing model
const { isAuthenticatedUser } = require("../middleware/auth");

// Login route /contact-us/ POST -> Create
// router.post("/contact-us", );


module.exports = router;
