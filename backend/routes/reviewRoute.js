const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router();

// Routes that don't require authentication (read operations) - PUT THESE FIRST
router.route("/").get(reviewController.getAllReviews);
router.route("/book/:bookId").get(reviewController.getReviewsByBookId);
router.route("/:id").get(reviewController.getReview);

// Routes that require authentication (create, update, delete) - PUT THESE AFTER
router.route("/").post(authController.protect, reviewController.createReview);

router
  .route("/:id")
  .patch(authController.protect, reviewController.updateReview)
  .delete(authController.protect, reviewController.deleteReview);

module.exports = router;
