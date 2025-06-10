const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");

dbConnect();

const app = express();

const mediaRouter = require("./routes/mediaRoutes.js");
const booksRouter = require("./routes/booksRoute.js");

// Midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Welcome to the page
app.get("/", (req, res) => {
  res.send("Hello and welcome");
});

// Routes
app.use("/api/media", mediaRouter);
app.use("/api/books", booksRouter);

// serve
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
