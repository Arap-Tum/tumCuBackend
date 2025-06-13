const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const cors = require("cors");

dbConnect();

const app = express();
// Midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import routes
const mediaRouter = require("./routes/mediaRoutes.js");
const booksRouter = require("./routes/booksRoute.js");
const leadersRouter = require("./routes/leadersRoutes.js");
const FLeadersRouter = require("./routes/FLeadersRoutes.js");

// tu be accesed with any front end
app.use(cors());

// app.use(cors({ origin: ['https://your-frontend.com', 'http://localhost:3000'] }));

// Welcome to the page
app.get("/", (req, res) => {
  res.send("Hello and welcome");
});

// Routes
app.use("/api/media", mediaRouter);
app.use("/api/books", booksRouter);
app.use("/api/leaders", leadersRouter);
app.use("/api/formerLeaders", FLeadersRouter);

// serve
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
