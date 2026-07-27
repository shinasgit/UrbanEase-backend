const mongoose = require('mongoose')

const helpSchema = new mongoose.Schema({
    jobType:{
        type:String,
        required:true
    },
    helpername:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    station:{
        type:String,
        required:true,
        
    },
    location:{
        type:String,
        required:false
    },
    phonenumber:{
        type:Number,
        required:false
    }

})

module.exports = mongoose.model('Help',helpSchema)