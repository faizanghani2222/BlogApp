const express = require("express");
const http = require("http");
const cors = require("cors");
const connection = require("./db");
const {user,upload,comment}=require("./Routes/index");
require("dotenv").config();


const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", user);
app.use("/blog", blog);
connection();
app.use("/file", upload);
app.use("/comment", comment);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("new user connected" + socket.id);
  socket.on("sent_by_client", (data) => {
    io.emit("sent_by_server", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


server.listen(PORT, () => {
  console.log(`server started on http://localhost:8080`);
});