const { loginUser } = require("./auth.service");

module.exports = {
  LoginUser: (req, res) => {
    const body = req.body;
    loginUser(body, (err, result) => {
      if (err) {
        return;
      }
      if (!result) {
        return res.status(404).json({
          success: 1,
          message: "result not found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: result,
      });
    });
  },
};
