const catchAsync = require("../utils/catchAsync");
const Like = require("../models/likeModel");
const AppError = require("../utils/appError");

exports.getUserLike = catchAsync(async (req, res, next) => {
  const like = await Like.findOne({
    bookId: req.params.bookId,
    user: req.user.id,
  });

  if (!like) {
    return res.status(200).json({
      status: "Success",
      data: { like: null },
    });
  }

  res.status(200).json({
    status: "Success",
    data: { like },
  });
});

exports.createOrUpdateLike = catchAsync(async (req, res, next) => {
  const { bookId, bookSource, status, rating } = req.body;

  if (rating !== undefined && (rating < 0 || rating > 5)) {
    return next(new AppError("Rating must be between 0 and 5", 400));
  }

  if (rating !== undefined && rating % 0.5 !== 0) {
    return next(new AppError("Rating must be in increments of 0.5", 400));
  }

  const like = await Like.findOneAndUpdate(
    {
      bookId,
      user: req.user.id,
    },
    {
      bookId,
      bookSource: bookSource || "openLibrary",
      status: status || "Read",
      rating: rating !== undefined ? rating : undefined,
      user: req.user.id,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "Success",
    data: { like },
  });
});

exports.updateRating = catchAsync(async (req, res, next) => {
  const { rating } = req.body;

  if (rating !== undefined && (rating < 0 || rating > 5)) {
    return next(new AppError("Rating must be between 0 and 5", 400));
  }

  if (rating !== undefined && rating % 0.5 !== 0) {
    return next(new AppError("Rating must be in increments of 0.5", 400));
  }

  const like = await Like.findOneAndUpdate(
    {
      bookId: req.params.bookId,
      user: req.user.id,
    },
    { rating: rating !== undefined ? rating : undefined },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!like) {
    return next(new AppError("No like/status found for this book", 404));
  }

  res.status(200).json({
    status: "Success",
    data: { like },
  });
});

exports.removeRating = catchAsync(async (req, res, next) => {
  const like = await Like.findOneAndUpdate(
    {
      bookId: req.params.bookId,
      user: req.user.id,
    },
    { $unset: { rating: "" } },
    { new: true }
  );

  if (!like) {
    return next(new AppError("No like/status found for this book", 404));
  }

  res.status(200).json({
    status: "Success",
    data: { like },
  });
});

exports.deleteLike = catchAsync(async (req, res, next) => {
  const like = await Like.findOneAndDelete({
    bookId: req.params.bookId,
    user: req.user.id,
  });

  if (!like) {
    return next(new AppError("No like/status found for this book", 404));
  }

  res.status(204).json({
    status: "Success",
    data: null,
  });
});

exports.getBookRatingStats = catchAsync(async (req, res, next) => {
  const bookId = req.params.bookId;

  const stats = await Like.aggregate([
    { $match: { bookId, rating: { $exists: true, $ne: null, $gte: 0 } } },
    {
      $group: {
        _id: "$bookId",
        averageRating: { $avg: "$rating" },
        ratingsCount: { $sum: 1 },
      },
    },
  ]);

  const result = stats[0] || {
    _id: bookId,
    averageRating: null,
    ratingsCount: 0,
  };

  res.status(200).json({
    status: "Success",
    data: {
      bookId: result._id,
      averageRating: result.averageRating !== null ? Math.round(result.averageRating * 10) / 10 : null,
      ratingsCount: result.ratingsCount,
    },
  });
});

exports.getLikesByBookId = catchAsync(async (req, res, next) => {
  const likes = await Like.find({
    bookId: req.params.bookId,
  })
    .populate({
      path: "user",
      select: "name photo",
    })
    .select("-__v");

  res.status(200).json({
    status: "Success",
    results: likes.length,
    data: { likes },
  });
});

module.exports = exports;
