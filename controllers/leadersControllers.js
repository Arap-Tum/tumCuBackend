const processAndUploadImage = require("../middlewares/sharp.js");
const Leader = require("../models/leaders.js");

// ADD NEW Library book ITEM
const addLeader = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    if (
      !req.body.name ||
      !req.body.position ||
      !req.body.year ||
      !req.body.course
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imageUrl = await processAndUploadImage(req.file.buffer);

    const newLeader = new Leader({
      name: req.body.name,
      position: req.body.position,
      year: req.body.year,
      course: req.body.course,
      cover: imageUrl,
    });

    await newLeader.save();
    return res.status(201).json({
      message: "The leader is saved successfull",
      data: newLeader,
    });
  } catch (error) {
    console.log(`This is the error: ${error}`);
    return res.status(500).json({
      error: "Something went wrong with adding the leader function: ",
      details: error.message,
    });
  }
};

// Gett all the media Item
const getLeaders = async (req, res) => {
  try {
    const leaders = await Leader.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "leaders fetched succesfully",
      count: leaders.length,
      data: leaders,
    });
  } catch (error) {
    console.log(`This is the error: ${error}`);
    return res.status(500).json({
      error: "Something went wrong with displaying the leaders function: ",
      details: error.message,
    });
  }
};

// Get book by ID
const getLeaderById = async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.id);
    if (!leader) {
      return res.status(404).json({ error: "leader not found" });
    }
    return res.status(200).json(leader);
  } catch (error) {
    console.log(`this is the error ${error}`);
    return res.status(500).json({
      error: "Failed to get leader",
      details: error.message,
    });
  }
};

// UPDATE MEDIA ITEM
const updateLeader = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      name: req.body.name,
      position: req.body.position,
      year: req.body.year,
      course: req.body.course,
    };

    if (req.file) {
      const newImageUrl = await processAndUploadImage(req.file.buffer);
      updateData.cover = newImageUrl;
    }

    const updatedItem = await Leader.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "leader item not found" });
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

// Delte media Item
const deleteLeader = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Leader.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "leader item not found" });
    }

    return res.status(200).json({
      message: " item deleted successfully",
      book: deletedItem,
    });
  } catch (error) {
    console.log(`Delete error: ${error}`);
    return res.status(500).json({
      error: "Something went wrong with deleting the leader item",
      details: error.message,
    });
  }
};

module.exports = {
  addLeader,
  getLeaders,
  getLeaderById,
  updateLeader,
  deleteLeader,
};
