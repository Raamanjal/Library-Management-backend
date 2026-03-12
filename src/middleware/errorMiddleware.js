const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || "Internal server error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (err.code === 11000) {
    statusCode = 400;
    const duplicateField = Object.keys(err.keyPattern || {})[0] || "field";
    message = `${duplicateField} must be unique`;
  }

  if (err.name === "CastError") {
    statusCode = 404;
    message = "Book not found";
  }

  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
