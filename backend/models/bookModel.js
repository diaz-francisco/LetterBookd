const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title."],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Please enter an author"],
    trim: true,
  },
  pages: {
    type: Number,
    min: [1, "Book cant have 0 pages."],
  },
  isbn: { type: String, unique: true },
  rating: {
    type: Number,
    default: 3.0,
    required: [true, "Please leave a rating."],
    min: [0.0, "Rating must be over a 0."],
    max: [5.0, "Rating cant be over 5."],
  },
  description: { type: String, trim: true },
  review: {
    type: String,
    trim: true,
    required: [true, "Please leave a review"],
  },
  cover: { type: String },
  dateCreated: {
    type: String,
    default: Date.now(),
  },
});

const Book = new mongoose.model(
  "Book",
  bookSchema
);

module.exports = Book;
