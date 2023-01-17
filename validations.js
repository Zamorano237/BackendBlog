const { body } = require("express-validator");

const registerValidation = [
  body("email", "Format d email invalide").isEmail(),
  // body("roles", "les roles doivent etre inclus dans un tableau").isArray(),
  body(
    "password",
    "Le mot de passe doit comporter au moins 5 caractères"
  ).isLength({ min: 5 }),
  body("avatarUrl", `Le lien de l'image est incorecte`).optional().isURL(),
  body("roles", `Le lien de l'image est incorecte`).optional().isArray(),
];

const postCreateValidation = [
  body("title", "Entrez le titre de l'article").isLength({ min: 3 }).isString(),
  body("text", "Saisir le texte de l'article").isLength({ min: 3 }).isString(),
  body("tags", "Format de tags invalide").optional().isArray(),
  body("imageUrl", "Lien d'image invalide").optional().isString(),
];

module.exports = { registerValidation, postCreateValidation };
