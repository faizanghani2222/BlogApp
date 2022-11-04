require("dotenv").config();
const jwt = require("jsonwebtoken");
const Blog=require("../Model/blog.model");



async function addBlog(token){
    let data = jwt.verify(token, process.env.SECRET_KEY);
    let blog = await Blog.create(req.body);
    blog["author"] = data._id;
    blog.save();
    return { message: blog, error: false }
}



async function getBlog(){
    let allBlog = await Blog.find({}).populate("author");
    return { message: allBlog, error: false }
}


async function getBlogById(id){
    let allBlog = await Blog.find({ _id: id }).populate("author");
    return { message: allBlog, error: false }
}

module.exports={addBlog,getBlog,getBlogById};