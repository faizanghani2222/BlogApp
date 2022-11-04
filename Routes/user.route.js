const express = require("express");
const User = require("../Model/user.model");
const app = express.Router();
const { createUser, loginUser, refreshToken, getUser } = require("../Controller/user.controller");

let error_message=(e)=>({ message: e.message, error: true });

// To signup user
app.post("/signup",(req, res) => {
  try {
    let response=createUser(req.body);
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(error_message(e));
  }
});
// To logged in user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res
        .status(401)
        .send({ message: "Invalid Credentials", error: true });
    }
    const response=loginUser(user);
    res.send(response);
  } catch (e) {
    res.status(500).send(error_message(e));
  }
});

// To refresh the token
app.post("/refresh", (req, res) => {
  try {
    let { refreshToken_for_newToken } = req.body;
    let response=refreshToken(refreshToken_for_newToken)
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(error_message(e));
  }
});
app.get("/user", async (req, res) => {
  try {
    let token = req.headers["authorization"];
    let response=getUser(token);
    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(error_message(e));
  }
});

module.exports = app;