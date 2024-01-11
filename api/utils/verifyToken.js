const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req,res,next) =>{
    const token = req.cookies.access_token;
    if(!token)
    {
        return res.status(401).json("Unauthorized");
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) =>{
      if(err)
      {
        return res.status(403).json("Invalid Token");
      }
      req.user = user;
      next();
    })
}

const verifyUser = (req,res,next) =>{
   verifyToken(req,res,next, ()=>{
      if(req.user.id === req.params.id || req.user.isAdmin)
      {
        next();
      }
      return res.status(403).json("Unauthorized");
   }) 
}

const verifyAdmin = (req,res,next) =>{
    verifyToken(req,res,next, ()=>{
       if(req.user.isAdmin)
       {
         next();
       }
       return res.status(403).json("Unauthorized");
    }) 
 }


module.exports = {verifyToken,verifyUser,verifyAdmin};