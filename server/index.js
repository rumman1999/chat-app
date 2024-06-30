const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI

const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

app.get("/" , (req , res)=>{
    res.send("Welcome")
})


mongoose.connect(uri , {
    useNewUrlParser : true, 
    useUnifiedTopology : true
}).then(()=>console.log("Mongodb connection established "))
    .catch((error)=>console.log("Mongodb connection failed " , error.message))

app.listen(port , ()=>{
    console.log(`my app is listening at ${port}`)
})