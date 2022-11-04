const express = require("express");
const { addBlog, getBlog, getBlogById } = require("../Controller/blog.controller");
const app = express.Router();
let error_message=(e)=>({ message: e.message, error: true });
app.post("/post",  (req, res) => {
  try {
    let token = req.headers["authorization"];
    let response=addBlog(token);
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(error_message(e));
  }
});
app.get("/", async (req, res) => {
  try {
    let response=getBlog();
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(error_message(e));
  }
});
app.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let response=getBlogById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error_message(e));
  }
});


module.exports = app;