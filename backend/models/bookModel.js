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

  isbn: { type: String, unique: true },

  openLibraryId: { type: String, unique: true },

  cover: { type: String },

  description: { type: String, trim: true },

  averageRating: {
    type: Number,
    default: 0,
  },

  reviewCount: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Book = new mongoose.model("Book", bookSchema);

module.exports = Book;
