const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { UniqueConstraintError, ValidationError } = require("sequelize");

const router = express.Router();

// Validation checks for signup
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username is required"),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  handleValidationErrors, // This handles validation errors from the body
];

// Sign up route
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  try {
    // Hash the password
    const hashedPassword = bcrypt.hashSync(password);

    // Create the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      username,
      hashedPassword,
    });

    // Prepare safe user object (to avoid sending back sensitive data)
    const safeUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };

    // Set the token cookie
    await setTokenCookie(res, safeUser);

    // Respond with the created user
    return res.status(201).json({
      user: safeUser,
    });
  } catch (err) {
    // Handle unique constraint error (duplicate email/username)
    if (err instanceof UniqueConstraintError) {
      const errors = {};

      err.errors.forEach((e) => {
        if (e.path === "email") {
          errors.email = "User with that email already exists";
        }
        if (e.path === "username") {
          errors.username = "User with that username already exists";
        }
      });

      return res.status(500).json({
        message: "User already exists",
        errors: errors,
      });
    }

    // Handle Sequelize validation errors
    if (err instanceof ValidationError) {
      const errors = {};

      err.errors.forEach((e) => {
        errors[e.path] = e.message;
      });

      return res.status(400).json({
        message: "Validation error", // This is the Sequelize validation error
        errors: errors,
      });
    }

    // General server error (catch-all)
    return res.status(500).json({
      message: "An error occurred during signup",
    });
  }
});



module.exports = router;
