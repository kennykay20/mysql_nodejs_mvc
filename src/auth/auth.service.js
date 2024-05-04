const pool = require("../database/config");
const jwt = require("jsonwebtoken");
const { compareSync } = require("bcrypt");
const { config } = require("../config");

module.exports = {
  loginUser: (data, callBack) => {
    const { email, password } = data;
    const isDeleted = false;
    pool.query(
      `select * from registration where email=? and isDeleted=?`,
      [email, isDeleted],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        if (results && results.length > 0) {
          const isMatch = compareSync(password, results[0].password);
          console.log("isMatch ", isMatch);
          if (isMatch) {
            const token = jwt.sign({ email: results[0].email }, config.Secret, {
              expiresIn: "1h",
            });
            const result = {
              email,
              token,
            };
            return callBack(null, result);
          }
          const message = "Password not match";
          return callBack(null, message);
        }
      }
    );
  },
};
