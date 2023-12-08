const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const ProductsCollection = require("./models/Products");

require("dotenv").config();

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await ProductsCollection.deleteMany();
    await ProductsCollection.create(jsonProducts);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
