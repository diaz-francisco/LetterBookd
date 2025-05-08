const Book = require("./../models/bookModel");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllBooks = catchAsync(async (req, res, _next) => {
  // Use APIFeatures to handle query parameters
  const features = new APIFeatures(Book.find(), req.query).filter().sort().limitFields().paginate();

  const books = await features.query;

  res.status(200).json({
    status: "Success",
    results: books.length,
    data: {
      book: books,
    },
  });
});

exports.getBook = catchAsync(async (req, res, _next) => {
  const book = await Book.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    book: {
      book,
    },
  });
});

exports.submitBook = catchAsync(async (req, res, _next) => {
  const addBook = await Book.create(req.body);

  res.status(201).json({
    status: "Success",
    data: { book: addBook },
  });
});

exports.updateBook = catchAsync(async (req, res, _next) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "Success",
    data: { updatedBook },
  });
});

exports.deleteBook = catchAsync(async (req, res, _next) => {
  await Book.findByIdAndUpdate(req.params.id, {
    active: false,
  });

  res.status(204).json({
    status: "Success, content deleted",
    data: null,
  });
});

module.exports;

//test
