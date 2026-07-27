const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    userID:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    }

})

module.exports = mongoose.model('Booking',BookSchema)