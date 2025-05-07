const mongoose = require("mongoose");
const User = require("./userModel");

const reviewSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
    required: [true, "Review must belong to a book"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
  rating: {
    type: Number,
    required: [true, "Please leave a rating"],
    min: [0.0, "Rating must be at least 0"],
    max: [5.0, "Rating can't be over 5"],
  },
  text: {
    type: String,
    trim: true,
    required: [true, "Please leave a review text"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
