const ProductsCollection = require("../models/Products");

const getAllProducts = async (req, res) => {
  throw new Error("Testing errors");
  const products = await ProductsCollection.find({});
  //   res.status(200).json({
  //     success: true,
  //     products,
  //   });
  res.send("successful");
};

module.exports = { getAllProducts };
