const express = require("express");
const router = express.Router();

//Controller
const { register } = require("../controllers/UserController");

//Middlewares
const validate = require("../middlewares/handleValidation");
const { userCreateValidation } = require("../middlewares/UserValidations");

router.post("/register", userCreateValidation(), validate, register);

module.exports = router;
