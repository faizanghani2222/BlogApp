require("dotenv").config();
const mongoose=require("mongoose");
const connection=async ()=>{
try {
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
    await mongoose.connect(process.env.MDATABASE,connectionParams)
    console.log("Connected to Database")
} catch (err) {
    console.log(err.message);
}
}
module.exports=connection;