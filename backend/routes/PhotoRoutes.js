const express = require("express");
const router = express.Router();

const {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
} = require("../controllers/PhotoController");

const { photoInsertValidations } = require("../middlewares/PhotoValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");
const validate = require("../middlewares/handleValidation");

router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
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
module.exports = router;
