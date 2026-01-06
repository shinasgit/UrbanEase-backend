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
    status:{
        type:String,
        default:"Pending"
    }

})

module.exports = mongoose.model('Appliance',AppSchema)