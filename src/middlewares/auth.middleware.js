const jwt = require("jsonwebtoken");
const { config } = require("../config");

module.exports = {
  AuthValidate: (req, res, next) => {
    let token = null;
    const headers = req.headers;
    if (headers["authorization"] === undefined) {
      return res.status(401).json({
        success: 0,
        message: "no authorization header or cookie",
      });
    }

    token = headers["authorization"].split(" ")[1];
    if (token === undefined) {
      return res.status(401).json({
        success: 0,
        message:
          "authorization token or cookie is required, token for this route in the format: <Bearer token>",
      });
    }
    jwt.verify(token, config.Secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: 0,
          message: "Invalid token",
        });
      }
    });

    next();
  },
};
