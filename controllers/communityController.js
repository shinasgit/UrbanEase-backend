const CommunityListing = require('../models/communityListingModel');

exports.addListing = async (req, res) => {
    try {
        const userId = req.payload; // Set by jwtMiddleware
        const { title, description, price, listingType, category } = req.body;
        
        // Handle images from multer
        let images = [];
        if (req.files) {
            images = req.files.map(file => file.filename);
        }
        
        // Enforce the 20 active listing limit
        const activeCount = await CommunityListing.countDocuments({ userId, status: 'Active' });
        if (activeCount >= 20) {
            return res.status(403).json("LIMIT_REACHED");
        }
        
        const newListing = new CommunityListing({
            title, description, price, listingType, category, images, userId
        });
        
        await newListing.save();
        res.status(200).json(newListing);
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.getAllListings = async (req, res) => {
    try {
        // Only return Active listings for the marketplace
        const listings = await CommunityListing.find({ status: 'Active' });
        res.status(200).json(listings);
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.getUserListings = async (req, res) => {
    try {
        const userId = req.payload;
        // Return all listings (Active, Sold, Rented) for the user's dashboard
        const listings = await CommunityListing.find({ userId });
        res.status(200).json(listings);
    } catch (error) {
        res.status(401).json(error);
    }
}
