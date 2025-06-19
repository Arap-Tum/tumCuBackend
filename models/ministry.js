const mongoose = require("mongoose");

const joinMinistrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    ministy: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Ministry = mongoose.model("Ministry", joinMinistrySchema);

module.exports = Ministry;
