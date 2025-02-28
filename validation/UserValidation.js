const joi= require("joi");
const { model } = require("mongoose");



const Userschema= joi.object({
    full_name:joi.string().required(),
    phone:joi.string().required(),
    image:joi.string().required(),
    username:joi.string().required(),
    password:joi.string().required(),
    
})

function Uservalidation(req,res,next){
    const {full_name,phone,image, username,password}=req.body;
    const {error}=Userschema.validate({full_name,phone,image, username,password})
    if (error){
    return res.json(error)
    }
    next()
}


module.exports=Uservalidation;