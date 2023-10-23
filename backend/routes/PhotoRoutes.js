const express = require("express");
const router = express.Router();

const { insertPhoto } = require("../controllers/PhotoController");

const { photoInsertValidations } = require("../middlewares/PhotoValidations");
const authGuard = require("../middlewares/authGuard");
const { imageUpload } = require("../middlewares/imageUpload");
const validate = require("../middlewares/handleValidation");

router.get("/", (req, res) => {
  res.send("oi");
});

router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidations(),
  validate,
  insertPhoto
);
module.exports = router;
