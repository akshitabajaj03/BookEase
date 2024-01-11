const express = require("express");
const router = express.Router();

router.use(express.json());

const Hotel = require("../models/hotel");
const { verifyAdmin } = require("../utils/verifyToken");

//CREATE
router.post("/", verifyAdmin ,async(req,res) =>{
    const hotel = new Hotel(req.body);
    try{
      const newHotel = await hotel.save();
      return res.status(200).json(newHotel);
    }catch(err){
        return res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", verifyAdmin ,async(req,res)=>{
    try{
      const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body}, {new:true} );
      return res.status(200).json(updatedHotel);
    }catch(err){
        return res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", verifyAdmin, async(req,res) =>{
    try{
      const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
      return res.status(200).json(deletedHotel);
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET
router.get("/:id", async(req,res) =>{
    try{
      const reqHotel = await Hotel.findById(req.params.id);
      return res.status(200).json(reqHotel);
    }catch(err){
        return res.status(500).json(err);
    }
})

//GET ALL
router.get("/", async(req,res) =>{
    try{
      const hotels = await Hotel.find(req.params.id);
      return res.status(200).json(hotels);
    }catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;