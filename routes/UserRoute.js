const express=require("express");
const router=express.Router();
const { findall, save, findById, deleteById, update } = require("../controller/UserController");
const Uservalidation=require("../validation/UserValidation")
const multer= require("multer")
const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'place_images')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage})

router.get("/", findall);
router.post("/",Uservalidation,save);
router.get("/:id",findById);
router.delete("/:id",deleteById);
router.put("/:id",update);
router.post("/uploadimage", upload.single('file'),save);




module.exports=router;
