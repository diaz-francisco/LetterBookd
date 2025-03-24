const Book = require("./../models/bookModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllBooks = catchAsync(
  async (req, res, _next) => {
    const books = await Book.find(req.body);

    res.status(200).json({
      status: "Success",
      results: books.length,
      data: {
        book: books,
      },
    });
  }
);

exports.getBook = catchAsync(
  async (req, res, _next) => {
    const book = await Book.findById(
      req.params.id
    );

    res.status(200).json({
      status: "Success",
      book: {
        book,
      },
    });
  }
);

exports.submitBook = catchAsync(
  async (req, res, _next) => {
    const addBook = await Book.create(req.body);

    res.status(201).json({
      status: "Success",
      data: { book: addBook },
    });
  }
);

exports.updateBook = catchAsync(
  async (req, res, _next) => {
    const updatedBook =
      await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      status: "Success",
      data: { updatedBook },
    });
  }
);

exports.deleteBook = catchAsync(
  async (req, res, _next) => {
    await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "Success, content deleted",
      data: null,
    });
  }
);

module.exports;
