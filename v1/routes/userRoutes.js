const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validationHandler");
const userValidator = require("../validators/authValidator");
const UserController = require("../controllers/UsersController");

router
  .route("/")
  .get(UserController.index)
  .post([validate(userValidator)], UserController.create);

module.exports = router;
