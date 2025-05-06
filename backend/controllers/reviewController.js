const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");

const getAllReviews = catchAsync(async (req, res, _next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "Success",
    results: reviews.length,
    data: { data: reviews },
  });
});

const getReview = catchAsync(async (req, res, _next) => {
  const review = Review.findById(req.params.id);

  res.status(200).json({
    staus: "Success",
    data: review,
  });
});

const createReview = catchAsync(async (req, res, _next) => {
  const newReview = await Review.create({});
});
