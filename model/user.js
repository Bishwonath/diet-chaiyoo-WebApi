// const { default: mongoose } = require("mongoose");

const mongoose=require("mongoose");

const userSchema =new mongoose.Schema({

    full_name:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    image: {
        type: String,
        require:false
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }

});

const User=mongoose.model("users",userSchema);

module.exports=User;

