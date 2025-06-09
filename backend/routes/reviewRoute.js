const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

// Protect all routes
// router.use(authController.protect);

router.route("/").get(reviewController.getAllReviews).post(reviewController.createReview);

router
  .route("/:id")
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .patch(reviewController.deleteReview);

module.exports = router;
