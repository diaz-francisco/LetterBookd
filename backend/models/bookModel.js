// const mongoose = require("mongoose");

// const bookSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: [true, "Please enter a title."],
//     trim: true,
//     index: true,
//   },

//   author: {
//     type: String,
//     required: [true, "Please enter an author"],
//     trim: true,
//     index: true,
//   },

//   isbn: { type: String, unique: true, index: true },

//   openLibraryId: { type: String, unique: true },

//   cover: { type: String },

//   description: { type: String, trim: true },

//   averageRating: {
//     type: Number,
//     default: 0,
//   },

//   reviewCount: {
//     type: Number,
//     default: 0,
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// //Text index for full-text search
// bookSchema.index({
//   title: "text",
//   author: "text",
//   description: "text",
// });

// //Checking for Soft-Deletion
// bookSchema.pre(/^find/, function (next) {
//   this.find({ active: { $ne: false } });
//   next();
// });

// const Book = new mongoose.model("Book", bookSchema);

// module.exports = Book;
