const express = require("express");
const listController = require("../controllers/listController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/").get(listController.getAllLists).post(authController.protect, listController.createList);

router.route("/:id").get(listController.getList).patch(listController.updateList).patch(listController.deleteList);

module.exports = router;
