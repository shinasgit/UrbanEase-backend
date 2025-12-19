//import and config dotenv
require('dotenv').config()

//import mongoose
const mongoose = require('mongoose')

dbString = process.env.connectionString

//connect to mongodb db
mongoose.connect(dbString).then(()=>{
    console.log("Connected to MongoDB");  
}).catch((err)=>{
    console.log("Error connecting to MongoDB");
    
})