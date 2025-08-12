const mongoose = require("mongoose");

const bookLikeSchema = new mongoose.Schema({
  id: { enum: ["openLibrary"] },
  likedStatus: { type: Boolean, default: false },
});

const Like = new mongoose.model("bookLike", bookLikeSchema);

module.exports = Like;
