const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review cant be left empty"],
  },
  rating: {
    type: Number,
    required: [
      true,
      "Must leave a rating for the book",
    ],
  },
  dateCreated: {
    type: String,
    default: Date.now(),
  },
});

const Review = mongoose.model(
  "Review",
  reviewSchema
);

module.exports = Review;
