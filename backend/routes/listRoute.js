const express = require("express");
const listController = require("../controllers/listController");

const router = express.Router();

router.route("/").get(listController.getAllLists).post(listController.createList);

router.route("/:id").get(listController.getList).patch(listController.updateList).patch(listController.deleteList);

module.exports = router;
