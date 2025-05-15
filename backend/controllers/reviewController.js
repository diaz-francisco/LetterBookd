const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllReviews = catchAsync(async (req, res, _next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "Success",
    results: reviews.length,
    data: { data: reviews },
  });
});

exports.getReview = catchAsync(async (req, res, _next) => {
  const review = await Review.findById(req.params.id);

  res.status(200).json({
    staus: "Success",
    data: review,
  });
});

exports.createReview = catchAsync(async (req, res, _next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "Success",
    data: newReview,
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
