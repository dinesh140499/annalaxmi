const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;
    console.log("middleware : ", req.headers.authorization);
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }
    
    const token = authHeader.split(" ")[1];
    console.log("😂check token : ",jwt.verify(token, process.env.JWT_SECRET))
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // attach user

    next();
  } catch (error) {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired",
        });
      }
    }
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};
