const Member = require("../models/members.js");
const { validationResult } = require("express-validator");

// add new Member

const addMember = async (req, res) => {
  try {
    // check for validation errors
    const errorrs = validationResult(req);
    const messages = errorrs
      .array()
      .map((err) => err.msg)
      .join("; ");
    if (!errorrs.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: messages,
        errorrs: errorrs.array(),
      });
    }

    const { name, reg, phone, course, residence, ministry } = req.body;

    // check if the phone number aleady exists
    const existingMember = await Member.findOne({ phone });
    if (existingMember) {
      return res.status(409).json({
        sucess: false,
        message: "A member with this phone numbers already exist  ",
      });
    }

    const newMember = new Member({
      name,
      reg,
      phone,
      course,
      residence,
      ministry,
    });

    await newMember.save();
    return res.status(201).json({
      message: "Meber saved succesfully",
      data: newMember,
    });
  } catch (error) {
    console.log(`This addd the error: ${error}`);
    return res.status(400).json({
      error: "something went wrong with adding",
      detail: error.message,
    });
  }
};

// GET ALL THE MEMBERS

const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Member fetched succesfully",
      count: members.length,
      data: members,
    });
  } catch (error) {
    console.log(`this is the error ${error}`);
    return res.status(500).json({
      error: "Failed to get member ",
      details: error.message,
    });
  }
};

// get a single member
const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    return res.status(200).json(member);
  } catch (error) {
    console.log(`this is the error ${error}`);
    return res.status(500).json({
      error: "Failed to get Member",
      details: error.message,
    });
  }
};

// UPDATE MEMBER

const updateMember = async (req, res) => {
  try {
    // check for validation errors
    const errorrs = validationResult(req);
    const messages = errorrs
      .array()
      .map((err) => err.msg)
      .join("; ");
    if (!errorrs.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: messages,
        errorrs: errorrs.array(),
      });
    }

    const { id } = req.params;

    const updateData = {
      name: req.body.name,
      reg: req.body.reg,
      phone: req.body.phone,
      course: req.body.course,
      residence: req.body.residence,
      ministry: req.body.ministry,
    };

    const updatedItem = await Member.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "member item not found" });
    }

    return res.status(200).json({
      message: " item updated successfully",
      book: updatedItem,
    });
  } catch (error) {
    console.log(`Update error: ${error}`);
    return res.status(500).json({
      error: "Something went wrong with updating the book item",
      details: error.message,
    });
  }
};

// DELETE MEMBER
const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Member.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Member item not found" });
    }

    return res.status(200).json({
      message: " item deleted successfully",
      data: deletedItem,
    });
  } catch (error) {
    console.log(`Delete error: ${error}`);
    return res.status(500).json({
      error: "Something went wrong with deleting the Member item",
      details: error.message,
    });
  }
};

module.exports = {
  addMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
