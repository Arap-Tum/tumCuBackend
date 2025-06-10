const mongoose = require("mongoose");

const leadersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    cover: {
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

const Leader = mongoose.model("Leader", leadersSchema);

module.exports = Leader;
