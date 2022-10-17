import express from "express"
import jwt from "jsonwebtoken"
import user from "./user.model.js"

const app=express.Router()

app.get("/",async (req,res)=>{
    const p=await user.find()
    res.send(p)
})

app.post("/login",(req,res)=>{
    const data=req.body
    try{
        let p=user.create(data)
        res.send(p)
    }catch{
        res.send("Enter Valid Credentials")
    }
})

export default app