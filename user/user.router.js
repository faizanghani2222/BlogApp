import express from "express"
import jwt from "jsonwebtoken"
import user from "./user.model.js"
import * as dotenv from 'dotenv' 
dotenv.config()

const tokenList={};
const app=express.Router()

app.get("/",async (req,res)=>{
    const p=await user.find()
    res.send(p)
})

app.post("/login",(req,res)=>{
    const d=req.body
    const userData={
        email:d.email,
    }
    try{
        const token=jwt.sign(userData,process.env.SECRET,{
            expiresIn:"1 day"
        })
        const refreshToken=jwt.sign(userData,process.env.REFRESH_SECRET,{
            expiresIn:"90 day"
        })
        const response={
            status:"Logged In",
             token:token,
             refreshToken:refreshToken
        }
        tokenList[refreshToken]=response
        
        if(d.email!==undefined && d.password!==undefined && d.email!=="" && d.password!==""){
        let p=user.create(d)
        res.send(response)
        }else {
            res.status(401).send("Enter Your Credentials")
        }
    }catch{
        res.status(401).send("Enter Valid Credentials")
    }
})

app.get("/private",(req,res)=>{
    const token=req.headers["authorization"];
    if(token){
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if(err){
                 res.status(401).send("Access Not Allowed")
            }
           else{
            res.send(decoded)
           }
        })
    }
   else{
    res.status(403).send("Access Not Allowed")
   }
})

export default app