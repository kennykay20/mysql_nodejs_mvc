const {
  CreateUser,
  GetAllUsers,
  GetSingleUser,
  UpdateUser,
  DeleteUser,
} = require("../users/user.controller");
const { LoginUser } = require("../auth/auth.controller");
const router = require("express").Router();
const { AuthValidate } = require('../middlewares/auth.middleware');

router.post("/api/v1/user", CreateUser);
router.get("/api/v1/users", AuthValidate, GetAllUsers);
router.get("/api/v1/user/:id", AuthValidate, GetSingleUser);
router.put("/api/v1/user/:id", AuthValidate, UpdateUser);
router.delete("/api/v1/user/:id", AuthValidate, DeleteUser);
//// Auth controller
router.post("/api/v1/login", LoginUser);

module.exports = router;
