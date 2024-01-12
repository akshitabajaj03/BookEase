const express = require("express");
const router = express.Router();
const Room = require("../models/room");
const Hotel = require("../models/hotel");
const { verifyAdmin } = require("../utils/verifyToken");

//CREATE
router.post("/", async(req,res) =>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try{
       const savedroom = await newRoom.save();
       try{
         Hotel.findByIdAndUpdate(hotelId, {$push : {rooms:savedroom._id} })
       }catch(err){
        return res.status(500).json(err);
       }
       return res.status(200).json(savedroom);
    }catch(err){
        return res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", verifyAdmin ,async(req,res)=>{
    try{
      const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true} );
      return res.status(200).json(updatedRoom);
    }catch(err){
        return res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, async(req,res) =>{
    const hotelId = req.params.hotelid;
    try{
      const deletedRoom = await Room.findByIdAndDelete(req.params.id);
      try{
        Hotel.findByIdAndUpdate(hotelId, {$pull : {rooms: req.params.id} })
      }catch(err){
       return res.status(500).json(err);
      }
      return res.status(200).json(deletedRoom);
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET
router.get("/:id", async(req,res) =>{
    try{
      const reqRoom = await Room.findById(req.params.id);
      return res.status(200).json(reqRoom);
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET ALL
router.get("/", async(req,res) =>{
    try{
      const rooms = await Room.find(req.params.id);
      return res.status(200).json(rooms);
    }catch(err){
        return res.status(500).json(err);
    }
})



module.exports = router;