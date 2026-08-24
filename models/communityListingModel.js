const mongoose = require('mongoose')

const communityListingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    listingType:{
        type:String,
        required:true,
        enum: ['Sell', 'Rent']
    },
    category:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Active" // Active, Sold, Rented, Pending
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('CommunityListing', communityListingSchema)
