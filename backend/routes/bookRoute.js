const epxress = require("express");
const bookController = require("./../controllers/bookController");
const authController = require("../controllers/authController");

const router = epxress.Router();

router.route("/").get(authController.protect, bookController.getAllBooks).post(bookController.submitBook);

router
  .route("/:id")
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .patch(authController.protect, authController.restrictTo("admin", "moderator"), bookController.deleteBook);

module.exports = router;
