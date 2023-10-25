const { body } = require("express-validator");

const photoInsertValidations = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O título é obrigatório")
      .isString()
      .withMessage("O título é obrigatório")
      .isLength({ min: 2 })
      .withMessage("O título precisa ter no mínimo 2 caracteres"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem é obrigatória");
      }
      return true;
    }),
  ];
};

const photoUpdateValidations = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrigatório.")
      .isLength({ min: 2 })
      .withMessage("O título precisa ter no mínimo 2 caracteres"),
  ];
};

const commentValidations = () => {
  return [
    body("comment").isString().withMessage("O comentário é obrigatório."),
  ];
};

module.exports = {
  photoInsertValidations,
  photoUpdateValidations,
  commentValidations,
};
