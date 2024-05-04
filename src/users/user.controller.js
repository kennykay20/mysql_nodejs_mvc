const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  removeUser,
} = require("./user.service");

module.exports = {
  CreateUser: (req, res) => {
    console.log("inside the user controller");
    const body = req.body;
    createUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(201).json({
        success: 1,
        data: results,
      });
    });
  },

  GetAllUsers: (req, res) => {
    getUsers((err, result) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "table not found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: result,
      });
    });
  },

  GetSingleUser: (req, res) => {
    getUserById(req.params, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.status(500).json({
          success: 0,
          message: "result not found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: result,
      });
    });
  },

  UpdateUser: (req, res) => {
    const data = { ...req.body, ...req.params };
    updateUser(data, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.status(500).json({
          success: 0,
          message: "record not found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "User updated successfully",
      });
    });
  },

  DeleteUser: (req, res) => {
    const data = req.params;
    removeUser(data, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.status(500).json({
          success: 0,
          message: "record not found",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "User deleted successfully",
      });
    });
  },
};
