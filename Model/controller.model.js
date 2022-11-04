const mongoose = require("mongoose");



const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
  iat: { type: String },
});


const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;