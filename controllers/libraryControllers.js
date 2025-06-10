const processAndUploadImage = require("../middlewares/sharp.js");
const Book = require("../models/library.js");

// ADD NEW Library book ITEM
const addBook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.category ||
      !req.body.description ||
      !req.body.cover
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imageUrl = await processAndUploadImage(req.file.buffer);

    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      description: req.body.description,
      cover: imageUrl,
    });

    await newBook.save();
    return res.status(201).json({
      message: "The book is saved successfull",
      book: newBook,
    });
  } catch (error) {
    console.log(`This is the error: ${error}`);
    return res.status(500).json({
      error: "Something went wrong with adding the book function: ",
      details: error.message,
    });
  }
};

// Gett all the media Item
const getAllTHeBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "books fetched succesfully",
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(`This is the error: ${error}`);
    return res.status(500).json({
      error: "Something went wrong with displaying the books function: ",
      details: error.message,
    });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "books not found" });
    }
    return res.status(200).json(book);
  } catch (error) {
    console.log(`this is the error ${error}`);
    return res.status(500).json({
      error: "Failed to get books",
      details: error.message,
    });
  }
};

// UPDATE MEDIA ITEM
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      description: req.body.description,
    };

    if (req.file) {
      const newImageUrl = await processAndUploadImage(req.file.buffer);
      updateData.cover = newImageUrl;
    }

    const updatedItem = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ error: "book item not found" });
    }

    return res.status(200).json({
      message: "book item updated successfully",
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
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Book.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "book item not found" });
    }

    return res.status(200).json({
      message: "book item deleted successfully",
      book: deletedItem,
    });
  } catch (error) {
    console.log(`Delete error: ${error}`);
    return res.status(500).json({
      error: "Something went wrong with deleting the book item",
      details: error.message,
    });
  }
};

module.exports = {
  addBook,
  getAllTHeBooks,
  getBookById,
  updateBook,
  deleteBook,
};
