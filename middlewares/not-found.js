const notFoundMiddleware = (req, res) => {
  return res
    .status(404)
    .send("<h2>Route does not exist</h2><a href='/'>Go Back Home<a/>");
};

module.exports = notFoundMiddleware;
