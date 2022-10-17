import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    name:{type:String},
    age:{type:Number}
})

const user=mongoose.model('user',userSchema)

export default user