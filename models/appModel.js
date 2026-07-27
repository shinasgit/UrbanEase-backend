const mongoose = require('mongoose')

const AppSchema = new mongoose.Schema({
    product:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    },
    booked:{
        type: String ,
        default:""
    }

})

module.exports = mongoose.model('Appliance',AppSchema)