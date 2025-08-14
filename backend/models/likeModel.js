const mongoose = require("mongoose");

const bookLikeSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: [true, "Review must have a book ID"],
    index: true,
  },
  bookSource: { enum: ["openLibrary", "googleBooks", "isbn"], default: "openLibrary" },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: [true, "Likes must belong to a user"],
  },
  likedStatus: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Like = new mongoose.model("bookLike", bookLikeSchema);

module.exports = Like;

/*
user
bookId
bookSource
status
created

remember to index

book interaction
*/
