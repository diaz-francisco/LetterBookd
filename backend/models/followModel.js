const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
  },
});

const Follow = new mongoose.model("follow", followSchema);
