const express = require("express");
const RequestController = require("../controllers/requestController.js");
const {
  validateCreateRequest,
  validateUpdateRequest,
  validateObjectId,
  validateQuery,
} = require("../middlewares/validation.js");

const router = express.Router();

// GET /api/requests - Get all requests with filtering and pagination
router.get("/", validateQuery, RequestController.getAllRequests);

// GET /api/requests/stats - Get statistics (must be before /:id route)
router.get("/stats", RequestController.getStats);

// GET /api/requests/:id - Get single request
router.get("/:id", validateObjectId, RequestController.getRequestById);

// POST /api/requests - Create new request
router.post("/", validateCreateRequest, RequestController.createRequest);

// PUT /api/requests/:id - Update request
router.put(
  "/:id",
  validateObjectId,
  validateUpdateRequest,
  RequestController.updateRequest
);

// DELETE /api/requests/:id - Delete request
router.delete("/:id", validateObjectId, RequestController.deleteRequest);

module.exports = router;
