require("dotenv").config();
const jwt = require("jsonwebtoken");
const Comment=require("../Model/comment.model")


async function addComment(token){
    let data = jwt.verify(token, process.env.SECRET_KEY);
    let comment = await Comment.create(req.body);
    comment["author"] = data._id;
    comment.save();
    return  { message: "Successful", error: false }
}


async function getComment(blog){
    let allComment = await Comment.find({ blog: blog })
    .populate("blog")
    .populate("author");
    return  { message: allComment, error: false }
}
module.exports={addComment,getComment}