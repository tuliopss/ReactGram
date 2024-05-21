const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");
const crypto = require("crypto");

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

const updatePhoto = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const reqUser = req.user;

    const photo = await Photo.findById(id);
    console.log(photo);
    console.log(reqUser);
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada."] });
      return;
    }

    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({ errors: ["Ocorreu um erro, tente novamente."] });
      return;
    }

    if (title) {
      photo.title = title;
    }

    await photo.save();
    res.status(200).json({ photo, message: "Foto atualizada com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Ocorreu um erro, tente novamente."] });
    return;
  }
};

const likePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }

  //check if user already liked
  if (photo.likes.includes(reqUser._id)) {
    res.status(422).json({ errors: ["Você já curtiu essa foto."] });
    return;
  }

  photo.likes.push(reqUser._id);

  photo.save();

  res.status(200).json({
    photoId: photo._id,
    userId: reqUser._id,
    message: "A foto foi curtida.",
  });
};

const commentPhoto = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);
  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontrada."] });
    return;
  }

  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
    idComment: crypto.randomUUID(),
  };

  photo.comments.push(userComment);

  await photo.save();

  res.status(200).json({
    comment: userComment,
    message: "Comentário adicionado com sucesso!",
  });
};

const searchPhotos = async (req, res) => {
  const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
