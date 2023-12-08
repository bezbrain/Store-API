const express = require("express");
const app = express();
// Import connection function
const connectDB = require("./db/connect");
// Port variable
const port = process.env.PORT || 3000;
// Import async error package for handling async and await
require("express-async-errors");
// Import general router
const productRouter = require("./routes/product.route");
// Import the dotenv
require("dotenv").config();

// MIDDLEWARES
// Import not found middleware
const notFoundMiddleware = require("./middlewares/not-found");
// import error handling
const errorHandlerMiddleware = require("./middlewares/error-handle");
// import json middleware. Although we won't be using it in this project because we won't be making any post request
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send('<h2>Store API</h2><a href="/api/v1/products">Products route</a>');
});

// Apply the route
app.use("/api/v1/products", productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const startDB = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startDB();
