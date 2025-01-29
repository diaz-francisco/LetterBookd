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
  pages: {
    type: Number,
    min: [1, "Book cant have 0 pages."],
  },
  rating: {
    type: Number,
    defualt: 3.0,
    required: true,
    min: [0.0, "Rating must be over a 0."],
    max: [5.0, "Rating cant be over 5."],
  },
  description: { type: String, trim: true },
});

const Book = new mongoose.model(
  "Book",
  bookSchema
);

module.exports = Book;
