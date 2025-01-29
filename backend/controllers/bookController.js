const Book = require("./../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(req.query);

    res.status(200).json({
      status: "success",
      result: books.length,
      data: {
        book: books,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: ["Invalid data sent!", err],
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(
      req.params.id
    );

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.submitBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      status: "success",
      data: { book: newBook },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Invalid data sent!",
      error: err.message,
    });
  }
};

module.exports;
