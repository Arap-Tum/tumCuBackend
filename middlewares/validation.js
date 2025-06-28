//  Input Validation
const { body, param, query } = require("express-validator");

// Validation rules for creating a request
const validateCreateRequest = [
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
      "Please provide a valid Kenyan phone number (07xxxxxxxx or 01xxxxxxxx)"
    ),

  body("course")
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("Course must be between 3 and 150 characters"),

  body("ministry")
    .isIn([
      "Media",
      "Worship",
      "Higschool",
      "Catering",
      "Instrumentalist",
      "Intercessory",
      "Hospital",
      "Ushering",
      "Creative",
      "Technician",
    ])
    .withMessage("Please select a valid ministry"),

  body("notes")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),
];

// Validation rules for updating a request
const validateUpdateRequest = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("phone")
    .optional()
    .trim()
    .matches(/^(07|01)\d{8}$/)
    .withMessage("Please provide a valid Kenyan phone number"),

  body("course")
    .optional()
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage("Course must be between 3 and 150 characters"),

  body("ministry")
    .optional()
    .isIn([
      "Media",
      "Worship",
      "Higschool",
      "Catering",
      "Instrumentalist",
      "Intercessory",
      "Hospital",
      "Ushering",
      "Creative",
      "Technician",
    ])
    .withMessage("Please select a valid ministry"),

  body("status")
    .optional()
    .isIn(["pending", "approved", "rejected"])
    .withMessage("Status must be pending, approved, or rejected"),

  body("notes")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters"),
];

// Validation for MongoDB ObjectId
const validateObjectId = [
  param("id").isMongoId().withMessage("Invalid request ID format"),
];

// Validation for query parameters
const validateQuery = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("ministry")
    .optional()
    .isIn([
      "Media",
      "Worship",
      "Higschool",
      "Catering",
      "Instrumentalist",
      "Intercessory",
      "Hospital",
      "Ushering",
      "Creative",
      "Technician",
    ])
    .withMessage("Invalid ministry filter"),

  query("status")
    .optional()
    .isIn(["pending", "approved", "rejected"])
    .withMessage("Invalid status filter"),

  query("sortBy")
    .optional()
    .isIn(["createdAt", "name", "ministry", "status"])
    .withMessage("Invalid sort field"),

  query("sortOrder")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Sort order must be asc or desc"),
];

// Validate  rules creating numbers
module.exports = {
  validateCreateRequest,
  validateUpdateRequest,
  validateObjectId,
  validateQuery,
};
