const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

exports.getAllReviews = catchAsync(async (req, res, _next) => {
  const reviews = await Review.find().populate({
    path: "user",
    select: "name photo",
  });

  res.status(200).json({
    status: "Success",
    results: reviews.length,
    data: { reviews },
  });
});

exports.getReview = catchAsync(async (req, res, _next) => {
  const review = await Review.findById(req.params.id).populate({ path: "user", select: "name photo" });

  if (!review) {
    return res.status(404).json({
      status: "fail",
      message: "Review not found",
    });
  }

  res.status(200).json({
    status: "Success",
    data: review,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const existingReview = await Review.findOne({
    book: req.body.book,
    user: req.user.id,
  });

  if (existingReview) {
    return next(new AppError("You have already reviewed this book", 400));
  }

  const newReview = await Review.create({
    book: req.body.book,
    rating: req.body.rating,
    review: req.body.review,
    user: req.user.id,
  });

  res.status(201).json({
    status: "Success",
    data: {
      review: newReview,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  // Only allow updating specific fields
  const allowedUpdates = ["review", "rating", "liked"];
  const updates = Object.keys(req.body);

  // Check if any non-allowed fields are being updated
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return next(new AppError("Invalid updates! Only review, rating, and liked status can be updated.", 400));
  }

  // Find and update in one operation
  const review = await Review.findOneAndUpdate(
    {
      _id: req.params.id,
      active: { $ne: false }, // Only update active reviews
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  //Check if review with id exists
  if (!review) {
    return next(new AppError("No active review found with that ID", 404));
  }

  // Check if user owns the review
  if (review.user.toString() !== req.user.id) {
    return next(new AppError("You can only update your own reviews", 403));
  }

  res.status(200).json({
    status: "Success",
    data: { review },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  // Find the review and check if it exists and is active
  const review = await Review.findOne({
    _id: req.params.id,
    active: { $ne: false },
  });

  if (!review) {
    return next(new AppError("No active review found with that ID", 404));
  }

  // Check if the user owns the review
  if (review.user.toString() !== req.user.id) {
    return next(new AppError("You can only delete your own reviews", 403));
  }

  // Soft delete the review
  review.active = false;
  review.updatedAt = Date.now();
  await review.save();

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

module.exports;
