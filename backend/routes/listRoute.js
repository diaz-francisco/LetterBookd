const express = require("express");
const listController = require("../controllers/listController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, listController.getAllLists)
  .post(authController.protect, listController.createList);

router
  .route("/:id")
  .get(authController.protect, listController.getList)
  .patch(authController.protect, listController.updateList)
  .patch(authController.protect, listController.deleteList);

module.exports = router;
