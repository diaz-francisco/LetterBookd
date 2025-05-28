const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A list must have a title"],
      trim: true,
      maxLength: [100, "List title can't exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "A list needs a description."],
      trim: true,
      maxLength: [1000, "Description can't exceed 1000 characters"],
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A list must have a creator"],
    },
    books: [
      {
        book: { type: mongoose.Schema.ObjectId, ref: "Book", required: [true, " A list must have books"] },
        note: { type: String, maxLength: [500, "note cant exceed 500 characters"] },
        order: { type: Number, required: true },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    isPrivate: { type: Boolean, default: false },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Populate references when finding lists
listSchema.pre(/^find/, function (next) {
  this.populate({
    path: "creator",
    select: "name username photo",
  }).populate({
    path: "books.book",
    select: "title author cover",
  });
  next();
});

// Update timestamps
listSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes
listSchema.index({ creator: 1, createdAt: -1 });
listSchema.index({ title: "text", description: "text" });

const List = mongoose.model("List", listSchema);

module.exports = List;
