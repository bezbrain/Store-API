const ProductsCollection = require("../models/Products");

const getAllProducts = async (req, res) => {
  const products = await ProductsCollection.find(req.query);
  res.status(200).json({
    success: true,
    nbHits: products.length,
    products,
    message: `Fetched all featured set to ${req.query.featured}`,
  });
};

module.exports = { getAllProducts };
