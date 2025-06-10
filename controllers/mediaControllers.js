const processAndUploadImage = require("../middlewares/sharp.js");
const Media = require("../models/media.js");

// ADD NEW MEDIA ITEM
const addMediaItem = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    if (!req.body.title || !req.body.link || !req.body.type) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imageUrl = await processAndUploadImage(req.file.buffer);

    const newMediaItem = new Media({
      title: req.body.title,
      cover: imageUrl,
      link: req.body.link,
      type: req.body.type,
    });

    await newMediaItem.save();
    return res.status(201).json({
      message: "The media item is saved successfull",
      mediaItems: newMediaItem,
    });
  } catch (error) {
    console.log(`This is the error: ${error}`);
    return res.status(500).json({
      error: "Something went wrong with adding the MEDIA function: ",
      details: error.message,
    });
  }
};

// Gett all the media Item
const getAllMediaItem = async (req, res) => {
  try {
    const mediaItems = await Media.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Media items fetched successfully",
      count: mediaItems.length,
      data: mediaItems,
    });
  } catch (error) {
    console.log(`This is the error: ${error}`);
    return res.status(500).json({
      error: "Something went wrong with displaying the MEDIA function: ",
      details: error.message,
    });
  }
};

module.exports = {
  addMediaItem,
  getAllMediaItem,
};
