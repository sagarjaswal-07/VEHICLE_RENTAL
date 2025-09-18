const jwt = require("jsonwebtoken");

const privateKey = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"]; 

  if (!authHeader) {
    return res.json({
      status: 403,
      success: false,
      message: "Token not found,please login to proceed"
    });
  }

  // Token format: "Bearer <token>"
  const token = authHeader.split(" ")[1];  

  jwt.verify(token, privateKey, function (err, result) {
    if (!err) {
      req.body["tokenData"] = result;
      next();
    } else {
      res.json({
        status: 403,
        success: false,
        message: "Invalid or expired token"
      });
    }
  });
};
