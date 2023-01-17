const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { registerValidation } = require("../validations");
//const verifyJWT = require("../middleware/verifyJWT");
const { handleValidationErrors } = require("../config/handleValidationErrors");
const jwtCheck = require("../config/jwtConfig");
const jwtAuthz = require("express-jwt-authz");

const checkPermissions = jwtAuthz(["read:users"], {
  customScopeKey: "permissions",
});

router
  .route("/")
  .post(
    registerValidation,
    handleValidationErrors,
    usersController.createNewUser
  );
router.route("/changepassword").patch(usersController.changePassword);
router.route("/forgotpassword").post(usersController.forgotPassword);

//router.use(verifyJWT);
//router.use(jwtCheck);
router.route("/").get(jwtCheck, checkPermissions, usersController.getAllUsers);

router
  .route("/")
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
