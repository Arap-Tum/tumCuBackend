const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^(07|01)\d{8}$/, "Please provide a valid Kenyan phone number"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
      minlength: [3, "Course must be at least 3 characters"],
      maxlength: [150, "Course cannot exceed 150 characters"],
    },
    ministry: {
      type: String,
      required: [true, "Ministry is required"],
      enum: {
        values: [
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
        ],
        message: "Please select a valid ministry",
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance
requestSchema.index({ ministry: 1, createdAt: -1 });
requestSchema.index({ phone: 1 });
requestSchema.index({ status: 1 });

// Virtual for time ago calculation
requestSchema.virtual("timeAgo").get(function () {
  const now = new Date();
  const diffTime = now - this.createdAt;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
});

module.exports = mongoose.model("Request", requestSchema);
