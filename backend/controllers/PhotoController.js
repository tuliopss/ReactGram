const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

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
    return;
  }
  res.status(201).json(newPhoto);
};

const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada."] });
      return;
    }

    //check if photo belongs to user
    if (!photo.userId.equals(user._id)) {
      res.status(404).json({ errors: ["Ocorreu um erro, tente novamente."] });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);
    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }
};

const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["CreatedAt", -1]])
    .exec();

  res.status(200).json(photos);
};

const getUserPhotos = async (req, res) => {
  const { id } = req.params;

  try {
    const photos = await Photo.find({ userId: id })
      .sort([["CreatedAt", -1]])
      .exec();

    if (!id) {
      res.status(404).json({ errors: ["Usuário não encontrado."] });
    }

    res.status(200).json(photos);
  } catch (error) {
    res.status(404).json({ errors: ["Ocorreu um erro, tente mais tarde."] });
    return;
  }
};

const getPhotoById = async (req, res) => {
  const { id } = req.params;

  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada."] });
      return;
    }

    res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
};
