const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewModel");
const AppError = require("../utils/appError");

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

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "user",
    select: "name photo",
  });

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  res.status(200).json({
    status: "Success",
    data: { review },
  });
});

exports.getReviewsByBookId = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({
    bookId: req.params.bookId,
  }).populate({
    path: "user",
    select: "name photo",
  });

  res.status(200).json({
    status: "Success",
    results: reviews.length,
    data: { reviews },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const existingReview = await Review.findOne({
    bookId: req.body.bookId,
    user: req.user.id,
  });

  if (existingReview) {
    return next(new AppError("You have already reviewed this book", 400));
  }

  const newReview = await Review.create({
    bookId: req.body.bookId,
    bookSource: req.body.bookSource || "openLibrary",
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
  const allowedUpdates = ["review"];
  const updates = Object.keys(req.body);

  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return next(new AppError("Invalid updates! Only review text can be updated.", 400));
  }

  const review = await Review.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  if (review.user.toString() !== req.user.id) {
    return next(new AppError("You can only update your own reviews", 403));
  }

  res.status(200).json({
    status: "Success",
    data: { review },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(new AppError("No review found with that ID", 404));
  }

  if (review.user.toString() !== req.user.id) {
    return next(new AppError("You can only delete your own reviews", 403));
  }

  await Review.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

module.exports;
