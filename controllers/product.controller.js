const ProductsCollection = require("../models/Products");

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};

  // Use this condition to confirm that the key, 'feature' exist before sorting
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" }; // This object value is to make sure that whatever letters are typed, it displays product names with those letters where "i" means, case insensitivity
  }
  // console.log(queryObject);
  const products = await ProductsCollection.find(queryObject);
  res.status(200).json({
    success: true,
    nbHits: products.length,
    products,
    message: `Fetched data`,
  });
};

module.exports = { getAllProducts };
