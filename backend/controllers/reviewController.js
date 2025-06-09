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

exports.updateReview = catchAsync(async (req, res, _next) => {
  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "Success",
    data: updatedReview,
  });
});

exports.deleteReview = catchAsync(async (req, res, _next) => {
  await Review.findByIdAndUpdate(req.params.id, {
    active: false,
  });

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

module.exports;
