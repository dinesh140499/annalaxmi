// src/middleware/validate.middleware.js
exports.validate = (schema) => (req, res, next) => {
  try {
    const data = schema.parse(req.body);

    req.body = data; // sanitized data
    next();
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: error.errors?.[0]?.message || "Validation error",
      errors: error.errors,
    });
  }
};