const express = require("express");
const likeController = require("../controllers/likeController");
const authController = require("../controllers/authController");

const router = express.Router();

// Temporary test route to verify routing works
router.get("/test", (req, res) => {
  res.json({ message: "Like routes are working!" });
});

router.route("/book/:bookId/stats").get(likeController.getBookRatingStats);
router.route("/book/:bookId/user").get(authController.protect, likeController.getUserLike);
router
  .route("/book/:bookId/rating")
  .patch(authController.protect, likeController.updateRating)
  .delete(authController.protect, likeController.removeRating);

router
  .route("/book/:bookId")
  .get(likeController.getLikesByBookId)
  .post(
    (req, res, next) => {
      console.log("POST /book/:bookId hit!", req.params.bookId, req.body);
      next(); // Call next to continue to the next middleware
    },
    authController.protect,
    likeController.createOrUpdateLike
  )
  .delete(authController.protect, likeController.deleteLike);

module.exports = router;
