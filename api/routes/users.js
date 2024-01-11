const User = require("../models/user");
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken");

const express = require("express");
const router = express.Router();

//UPDATE
router.put("/:id",verifyUser, async(req,res)=>{
    try{
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true} );
      return res.status(200).json(updatedUser);
    }catch(err){
        return res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id",verifyUser, async(req,res) =>{
    try{
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json(deletedUser);
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET
router.get("/:id",verifyUser, async(req,res) =>{
    try{
      const reqUser = await User.findById(req.params.id);
      return res.status(200).json(reqUser);
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET ALL
router.get("/", verifyAdmin, async(req,res) =>{
    try{
      const users = await User.find(req.params.id);
      return res.status(200).json(users);
    }catch(err){
        return res.status(500).json(err);
    }
})


module.exports = router;