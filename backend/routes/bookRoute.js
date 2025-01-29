const epxress = require("express");
const bookController = require("./../controllers/bookController");

const router = epxress.Router();

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.submitBook);

router.route("/:id").get(bookController.getBook);

module.exports = router;
