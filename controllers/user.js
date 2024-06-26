// Importing model
const User = require("../models/user");
const Blog = require("../models/blog");
const sendToken = require("../utils/jwtToken");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../services/mail.service")
const { emailMessageToUser } = require("../constants/message/message")
require("dotenv").config();

const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.name": "name must be at least 3 characters long",
    "any.required": "name is required",
  }),
  email: Joi.string().min(3).required().email().messages({
    "string.email": "email must be at least 3 characters long",
    "any.required": "email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.password": "password must be at least 6 characters long",
    "any.required": "password is required",
  }),
  experience: Joi.number(),
  social_profile: Joi.string().min(3).required().messages({
    "string.social_profile":
      "social_profile must be at least 3 characters long",
    "any.required": "social_profile is required",
  }),
});


const contactUsSchema = Joi.object({
  message: Joi.string().min(10).required().messages({
    "string.message": "message must be at least 10 characters long",
    "any.required": "name is required",
  }),
  email: Joi.string().min(3).required().email().messages({
    "string.email": "email must be at least 3 characters long",
    "any.required": "email is required",
  }),
  subject: Joi.string().min(5).required().messages({
    "string.subject": "subject must be at least 5 characters long",
    "any.required": "subject is required",
  }),
});




exports.register = async (req, res, next) => {
  // Validate req.body using the registerSchema
  const { error, value } = registerSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = {};
    error.details.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors,
    });
  }

  //Checking req.body is empty

  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.experience ||
    !req.body.social_profile
  ) {
    return res.status(400).json({
      success: false,
      message: "field is empty",
    });
  }

  try {
    const userExist = await User.findOne({ email: req.body.email });

    if (!userExist) {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);

      // Hash password
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        experience: req.body.experience,
        social_profile: req.body.social_profile,
      });
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } else {
      return res.status(201).json({
        success: false,
        message: "Email already exists",
      });
    }
  } catch (error) {
    // console.log("error", error);
    return res.status(400).json({
      success: false,
      meesage: `Created failed`,
    });
  }
};

exports.login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      message: "field is empty",
    });
  }

  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (user) {
      //check for pasword
      const hashPasswordCheck = await bcrypt.compare(
        req.body.password,
        user.password
      );

      // console.log("hashPasswordCheck ", hashPasswordCheck);

      if (hashPasswordCheck) {
        sendToken(user, res);
        // return res.status(200).json({
        //   success: true,
        //   message: "Login Successful",
        //   data:
        // });
      } else {
        return res.status(200).json({
          success: false,
          message: "User password do not match",
        });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `failed operation ${error}`,
    });
  }
};

exports.profile = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const userProfile = await User.findOne({ _id: userId }).select("-_id -__v");

    const blogOfUser = await Blog.find({
      author: userProfile.id,
    }).countDocuments();
   

    if (userProfile) {
      return res.status(200).json({
        success: true,
        data: {
          ...userProfile._doc,
          createdAt: userProfile.createdAt.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
          updatedAt: userProfile.updatedAt.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          }),
          blogOfUser,
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "operation failed",
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  console.log("inside uppdate profile of the user");
  const userId = req.user._id;

  const { name, social_profile, experience } = req.body;
  try {
    const user = await User.findById({ _id: userId });
    if (user) {
      // Perform the update operation on the user object
      user.name = name ? name : user.name;
      user.social_profile = social_profile
        ? social_profile
        : user.social_profile;
      user.experience = experience ? experience : user.experience;

      await user.save(); // Save the updated user object
      return res.status(200).json({
        success: true,
        message: "User update successful",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "operation failed",
    });
  }
};


exports.contactUs = async (req, res) => {
  console.log("Inside contact js");

  // Validate req.body using the registerSchema
  const { error, value } = contactUsSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    const errors = {};
    error.details.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors,
      data:null,
    });
  }

  const { email, subject, message } = req.body;
  try {

    //TODO:: Think to add message QUEUE HERE,
    //To admin
    await sendMail(process.env.RECEIPT_EMAIL_ID, subject, `${message} and email is ${email}`);

    //To User for confirmation.
    await sendMail(email, "Thank you !! , Confirmation Email", emailMessageToUser);

    console.log(email);

    return res.status(200).json({
      success: true,
      message: "Get back to you soon.",
      error: null,
      data: null,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "",
      error: "Something went wrong, Email not sent!",
      data: null,
    })
  }

}