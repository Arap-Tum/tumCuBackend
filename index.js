const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./config/dbConnect.js");
const cors = require("cors");

// addintion
const helmet = require("helmet"); //shield against common online attacks
const rateLimit = require("express-rate-limit"); // limit how many requests a user can make to your server
const morgan = require("morgan"); //shows details of every incoming request in the console

// connect to the database
dbConnect();

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan("combined"));

// tu be accesed with any front end
app.use(cors());

// Body parsers (handle form and JSON INPUT)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting: only for request route
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
  },
});
app.use("/api/requests", limiter);

// Welcome to the page
app.get("/", (req, res) => {
  res.send("Hello and welcome");
});

// Import routes
const mediaRouter = require("./routes/mediaRoutes.js");
const booksRouter = require("./routes/booksRoute.js");
const leadersRouter = require("./routes/leadersRoutes.js");
const FLeadersRouter = require("./routes/FLeadersRoutes.js");
const membersRouter = require("./routes/membersRoutes.js");
const requestRouter = require("./routes/requestRoute.js");

// Routes
app.use("/api/media", mediaRouter);
app.use("/api/books", booksRouter);
app.use("/api/leaders", leadersRouter);
app.use("/api/formerLeaders", FLeadersRouter);
app.use("/api/members", membersRouter);
app.use("/api/requests", requestRouter);

//Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
