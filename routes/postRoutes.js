const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
//const verifyJWT = require("../middleware/verifyJWT");
const { postCreateValidation } = require("../validations");
const { handleValidationErrors } = require("../config/handleValidationErrors");

//router.use(verifyJWT);

router
  .route("/")
  .get(postController.getAll)
  .post(postCreateValidation, handleValidationErrors, postController.create)
  .patch(postController.update)
  .delete(postController.remove);

router.route("/tags").get(postController.getLastTags);
router.route("/getone").get(postController.getOne);

module.exports = router;
