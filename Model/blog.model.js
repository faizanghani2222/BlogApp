
const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  content: { type: String, required: true },
  categories: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  iat: { type: String },
});
const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;