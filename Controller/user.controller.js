require("dotenv").config();
const User = require("../Model/user.model");
const jwt = require("jsonwebtoken");



async function createUser(data) {
  await User.create(data);
  return {
    message: "Signup Successfull",
    error: false,
  };
}



async function loginUser(user){
  
    const token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
      expiresIn: "5 minutes",
    });
    const refreshToken = jwt.sign(
      user.toJSON(),
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "7 days" }
    );
    return {
      message: user,
      token: token,
      refreshToken: refreshToken,
      error: false,
    };
}


async function refreshToken(refToken){
  const data = jwt.verify(
    refToken,
    process.env.REFRESH_SECRET_KEY
  );
  const user_data = {
    _id: data._id,
    email: data.email,
    password: data.password,
  };
  const new_Token = jwt.sign(user_data, process.env.SECRET_KEY, {
    expiresIn: "5 minutes",
  });
  return  {
    message: user_data,
    token: new_Token,
    refreshToken: refToken,
    error: false
  }
}


async function getUser(token){
  let data = jwt.verify(token, process.env.SECRET_KEY);
  let user = await User.findById(data._id);
  return { message: user, error: false }
}



module.exports={createUser,loginUser,refreshToken,getUser}