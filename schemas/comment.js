const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  pw: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
