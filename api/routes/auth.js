const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

const router = express.Router();
dotenv.config();
router.use(express.json());
router.use(cookieParser());

//REGISTER
router.post("/register", async(req,res)=>{
    try{
      const salt = bcrypt.genSaltSync(10);
      const newUser = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        email : req.body.email,
      })
      const savedUser = await newUser.save();
      return res.status(200).json({
        username: savedUser.username,
        email: savedUser.email,
      })
    }catch(err){
        return res.status(500).json(err);
    }
})

//LOGIN
router.post("/login", async(req,res) =>{
    try{
         const {username, password} =req.body;
         const user = await User.findOne({username});
         if(!user)
         {
            return res.status(404).json("User not found");
         }
         const pass = await bcrypt.compareSync(password, user.password);
         if(!pass)
         {
            return res.status(400).json("Incorrect credentials");
         }

         const token = jwt.sign({id : user._id, isAdmin : user.isAdmin}, process.env.SECRET_KEY);
        
        
         return res.cookie("access_token", token, {
            httpOnly : true,
         }).status(200).json({
            username:user.username,
            email:user.email,
         });
    }catch(err){
        return res.status(500).json(err);
    }
})
module.exports = router;