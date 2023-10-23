const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

//Controllers

//Middlewares
const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");

//Insert photo with user relacio
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  //create photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    res
      .status(422)
      .json({ errors: ["Houve um problema, por favor tente novamente."] });
  }
  res.status(201).json(newPhoto);
};

module.exports = { insertPhoto };
