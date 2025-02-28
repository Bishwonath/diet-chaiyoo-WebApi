const mongoose=require("mongoose");

const connectDB=async () => {
    
    try{
        await mongoose.connect("mongodb://localhost:27017/diet_chaiyoo");
        console.log("Mongoose Connected")
    }catch (e){
        console.log("Not connected")
    }
}

module.exports=connectDB;