import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import userRouter from "./user/user.router.js"

const app=express()
const port =process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.use("/user",userRouter)

app.get('/',(req,res)=>{
    res.send("Hello server 1")
})

app.listen(port,async ()=>{
    await mongoose.connect('mongodb+srv://faizanghani2222:27102001@cluster0.ett7idf.mongodb.net/blog')
    console.log("started server")
})