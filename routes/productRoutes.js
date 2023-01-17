/** @format */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
//const verifyJWT = require("../middleware/verifyJWT");

//router.use(verifyJWT);

router
  .route('/')
  .get(productController.getAll)
  .post(productController.create)
  .patch(productController.update)
  .delete(productController.remove);

module.exports = router;
