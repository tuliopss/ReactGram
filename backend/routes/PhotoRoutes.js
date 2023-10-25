const express = require("express");
const router = express.Router();

const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
} = require("../controllers/PhotoController");

const {
  photoInsertValidations,
  photoUpdateValidations,
  commentValidations,
} = require("../middlewares/PhotoValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");
const validate = require("../middlewares/handleValidation");

router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/search", authGuard, searchPhotos);
router.get("/:id", authGuard, getPhotoById);
router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidations(),
  validate,
  insertPhoto
);
router.delete("/:id", authGuard, deletePhoto);
router.put("/:id", authGuard, photoUpdateValidations(), validate, updatePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.put(
  "/comment/:id",
  authGuard,
  commentValidations(),
  validate,
  commentPhoto
);

module.exports = router;
