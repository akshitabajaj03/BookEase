const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");
const usersRoute = require("./routes/users");
const cookieParser = require("cookie-parser");

dotenv.config();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database Connected");
})
.catch((err) =>{
    console.log(err);
})

app.use("/api/users",usersRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/auth",authRoute);

app.listen(process.env.PORT || 8080, ()=>{
    console.log("Backend connected");
})

