const mongoose = require("mongoose");

const bookLikeSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: [true, "Must have a book ID"],
    index: true,
  },
  bookSource: { type: String, enum: ["openLibrary", "googleBooks", "isbn"], default: "openLibrary", required: true },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: [true, "Must belong to a user"],
  },
  status: {
    type: String,
    enum: ["Read", "Want to read", "Currently reading"],
    required: true,
  },
  rating: {
    type: Number,
    min: [0, "Rating cannot be lower than a 0"],
    max: [5, "Rating cannot exceed 5"],
    validate: {
      validator: function (val) {
        return val % 0.5 === 0;
      },
      message: "Rating must be in increments of 0.5",
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

bookLikeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

bookLikeSchema.index({ bookId: 1, user: 1 }, { unique: true });
bookLikeSchema.index({ user: 1, status: 1 });
bookLikeSchema.index({ user: 1, createdAt: 1 });

const Like = new mongoose.model("bookLike", bookLikeSchema);

module.exports = Like;
