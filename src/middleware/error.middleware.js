const errorMiddleware = (err, req, res, next) => {
    console.log(err);
  
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
  
    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
      statusCode = 400;
      message = `${Object.keys(err.keyValue)} already exists`;
    }
  
    // Mongoose Cast Error
    if (err.name === "CastError") {
      statusCode = 400;
      message = "Invalid ID";
    }
  
    // Mongoose Validation Error
    if (err.name === "ValidationError") {
      statusCode = 400;
      message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ");
    }
  
    // Zod Error
    if (err.name === "ZodError") {
      statusCode = 400;
      message = err.errors.map((e) => e.message).join(", ");
    }
  
    return res.status(statusCode).json({
      success: false,
      message,
    });
  };
  
  module.exports = errorMiddleware;