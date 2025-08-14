const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: [true, "Review must have a book ID"],
    index: true,
  },
  bookSource: {
    type: String,
    required: [true, "Review must specify the book data source"],
    enum: ["openLibrary", "googleBooks", "isbn"],
    default: "openLibrary",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  },
  review: {
    type: String,
    trim: true,
    required: [true, "Please leave a review text"],
    maxlength: [1500, "Review cannot exceed 1500 characters"],
  },
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

// Index for ensuring one review per user per book
reviewSchema.index({ bookId: 1, user: 1 }, { unique: true });

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
