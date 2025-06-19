const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    reg: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: false,
    },
    residence: {
      type: String,
      required: false,
    },
    ministry: {
      type: String,
      required: false,
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

const Member = mongoose.model("Member", membersSchema);

module.exports = Member;
