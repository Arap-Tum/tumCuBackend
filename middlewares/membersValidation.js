const { body, req, query } = require("express-validator");

// Validation rule for adding new user

const validateAddingMember = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("phone")
    .trim()
    .matches(/^(07|01)\d{8}$/)
    .withMessage(
      "PLease provide a valid Phone number (07xxxxxxxx or 01xxxxxxxx)"
    ),
];

const validateUpdateMember = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("phone")
    .trim()
    .matches(/^(07|01)\d{8}$/)
    .withMessage(
      "PLease provide a valid Lenyan Phone number (07xxxxxxxx or 01xxxxxxxx)"
    ),
];

module.exports = {
  validateAddingMember,
  validateUpdateMember,
};
