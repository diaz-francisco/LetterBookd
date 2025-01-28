const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title."],
    trim: true,
    unique: true,
  },
  author: {
    type: String,
    required: [true, "Please enter an author"],
    trim: true,
  },
});

const Book = new mongoose.model(
  "Book",
  bookSchema
);

module.exports = Book;
