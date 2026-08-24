const Vehicle = require('../models/vehicleModel');

exports.addVehicle = async (req, res) => {
    try {
        const providerId = req.payload; // Set by providerJwtMiddleware
        const { vehicleName, type, rentPerHour, rentPerDay, location } = req.body;
        
        // Handle images from multer
        let images = [];
        if (req.files) {
            images = req.files.map(file => file.filename);
        }
        
        const newVehicle = new Vehicle({
            vehicleName, type, rentPerHour, rentPerDay, location, providerId, images
        });
        
        await newVehicle.save();
        res.status(200).json(newVehicle);
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.getVehicles = async (req, res) => {
    try {
        // Get all active vehicles for the user marketplace
        const vehicles = await Vehicle.find({ status: 'Active' });
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(401).json(error);
    }
}
