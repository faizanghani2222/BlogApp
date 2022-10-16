import express from "express"

const app=express()

app.get('/',(req,res)=>{
    res.send("Hello server 1")
})

app.listen(8080,(req,res)=>{
    console.log("started")
})