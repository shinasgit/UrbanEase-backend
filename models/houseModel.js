const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema({
    hostelName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    rent:{
        type:Number,
        required:true
    },
    deposit:{
        type:Number,
        required:true
    },
    propertyType:{
        type:String,
        required:true
    },
    metro:{
        type:String,
        required:true
    },
    busStop:{
        type:String,
        required:true
    },
    vacancy:{
        type:Number,
        required:true
    },
    furnishing:{
        type:String,
        required:true
    },
    status:{
        type: String ,
        default:"Pending"
    },
    userMail:{
        type: String ,
        required:true
    },
    uploadImage:{
        type:[String],
        required:true
    }
})

module.exports = mongoose.model('House',houseSchema)