const Request = require("../models/ministry.js");
const { validationResult } = require("express-validator");

class RequestController {
  // GET /api/requests - Get all requests
  static async getAllRequests(req, res) {
    try {
      const {
        ministry,
        status,
        page = 1,
        limit = 50,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = req.query;

      // Build filter object
      const filter = {};
      if (ministry) filter.ministry = ministry;
      if (status) filter.status = status;

      // Build sort object
      const sort = {};
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;

      // Calculate pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Execute query
      const requests = await Request.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean();

      // Get total count for pagination info
      const totalCount = await Request.countDocuments(filter);
      const totalPages = Math.ceil(totalCount / parseInt(limit));

      res.status(200).json({
        success: true,
        data: requests,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1,
        },
      });
    } catch (error) {
      console.error("Error fetching requests:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch requests",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // GET /api/requests/:id - Get single request
  static async getRequestById(req, res) {
    try {
      const { id } = req.params;

      const request = await Request.findById(id);

      if (!request) {
        return res.status(404).json({
          success: false,
          message: "Request not found",
        });
      }

      res.status(200).json({
        success: true,
        data: request,
      });
    } catch (error) {
      console.error("Error fetching request:", error);

      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "Invalid request ID format",
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to fetch request",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // POST /api/requests - Create new request
  static async createRequest(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { name, phone, course, ministry, notes } = req.body;

      // Check if phone number already exists
      const existingRequest = await Request.findOne({ phone });
      if (existingRequest) {
        return res.status(409).json({
          success: false,
          message: "A request with this phone number already exists",
        });
      }

      // Create new request
      const newRequest = new Request({
        name,
        phone,
        course,
        ministry,
        notes,
      });

      const savedRequest = await newRequest.save();

      res.status(201).json({
        success: true,
        message: "Request created successfully",
        data: savedRequest,
      });
    } catch (error) {
      console.error("Error creating request:", error);

      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map((err) => ({
          field: err.path,
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validationErrors,
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to create request",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // PUT /api/requests/:id - Update request
  static async updateRequest(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const { id } = req.params;
      const updateData = req.body;

      // Remove fields that shouldn't be updated directly
      delete updateData._id;
      delete updateData.createdAt;
      delete updateData.updatedAt;

      const updatedRequest = await Request.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedRequest) {
        return res.status(404).json({
          success: false,
          message: "Request not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Request updated successfully",
        data: updatedRequest,
      });
    } catch (error) {
      console.error("Error updating request:", error);

      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "Invalid request ID format",
        });
      }

      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map((err) => ({
          field: err.path,
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: validationErrors,
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to update request",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // DELETE /api/requests/:id - Delete request
  static async deleteRequest(req, res) {
    try {
      const { id } = req.params;

      const deletedRequest = await Request.findByIdAndDelete(id);

      if (!deletedRequest) {
        return res.status(404).json({
          success: false,
          message: "Request not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Request deleted successfully",
        data: deletedRequest,
      });
    } catch (error) {
      console.error("Error deleting request:", error);

      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "Invalid request ID format",
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to delete request",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // GET /api/requests/stats - Get statistics
  static async getStats(req, res) {
    try {
      const stats = await Request.aggregate([
        {
          $group: {
            _id: "$ministry",
            count: { $sum: 1 },
            pending: {
              $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
            },
            approved: {
              $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] },
            },
            rejected: {
              $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] },
            },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      const totalRequests = await Request.countDocuments();
      const recentRequests = await Request.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      });

      res.status(200).json({
        success: true,
        data: {
          totalRequests,
          recentRequests,
          ministryStats: stats,
        },
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch statistics",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = RequestController;
