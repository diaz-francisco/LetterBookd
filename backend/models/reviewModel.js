const mongoose = require("mongoose");
const User = require("./userModel");

const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "Review cant be left empty"],
  },
  progress: {
    type: String,
    required: true,
    enum: [
      "Want to Read",
      "Currently Reading",
      "Completed",
    ],
  },
  rating: {
    type: Number,
    required: [true, "Please leave a rating."],
    min: [0.0, "Rating must be over a 0."],
    max: [5.0, "Rating cant be over 5."],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  reviewer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [
      true,
      "Must be signed in to leave a review",
    ],
  },
});

const Review = mongoose.model(
  "Review",
  reviewSchema
);

module.exports = Review;
