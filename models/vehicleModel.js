const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    vehicleName:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true, // Bike, Scooter, Car
    },
    rentPerHour:{
        type:Number,
        required:false
    },
    rentPerDay:{
        type:Number,
        required:false
    },
    location:{
        type:String,
        required:true
    },
    providerId:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    status:{
        type:String,
        default:"Active" 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Vehicle', vehicleSchema)
