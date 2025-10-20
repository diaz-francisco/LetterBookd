const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router();

// Protect all routes
router.use(authController.protect);

router.route("/").get(reviewController.getAllReviews).post(reviewController.createReview);

// Change this line to match your frontend call
router.route("/book/:bookId").get(reviewController.getReviewsByBookId);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
