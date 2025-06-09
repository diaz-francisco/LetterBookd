const mongoose = require("mongoose");

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
    min: [0.5, "Rating must be at least 0.5"],
    max: [5, "Rating cannot exceed 5"],
    validate: {
      validator: function (val) {
        // Allow half-star ratings (0.5, 1, 1.5, 2, 2.5, etc.)
        return val % 0.5 === 0;
      },
      message: "Rating must be in increments of 0.5",
    },
  },
  review: {
    type: String,
    trim: true,
    required: [true, "Please leave a review text"],
    maxlength: [1500, "Review cannot exceed 1500 characters"],
  },
  liked: { type: Boolean, default: false },
  active: { type: Boolean, default: true, select: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

reviewSchema.index({ book: 1, user: 1 }, { unique: true });

reviewSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

reviewSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
