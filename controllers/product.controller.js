const ProductsCollection = require("../models/Products");

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
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
  let result = ProductsCollection.find(queryObject);

  // Sorting based on what was typed in the sort query
  if (sort) {
    const sortList = sort.split(",").join(" ");
    // console.log(sortList);
    result = result.sort(sortList);
  } else {
    // If sort query does not exist, this should run instead
    result = result.sort("createdAt");
  }

  // Selecting a particular keys from the whole model
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    // console.log(sortList);
    result = result.select(fieldsList);
  }

  const products = await result;

  res.status(200).json({
    success: true,
    nbHits: products.length,
    products,
    message: `Fetched data`,
  });
};

module.exports = { getAllProducts };
