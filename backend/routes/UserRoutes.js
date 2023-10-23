const express = require("express");
const router = express.Router();

//Controller
const {
  register,
  login,
  getCurrentUser,
  updateUser,
  getUserById,
} = require("../controllers/UserController");

//Middlewares
const validate = require("../middlewares/handleValidation");

const {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
} = require("../middlewares/UserValidations");

const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.get("/:id", getUserById);
router.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  updateUser
);

module.exports = router;
