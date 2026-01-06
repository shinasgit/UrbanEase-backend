const House = require('../models/houseModel')

//add house
exports.addHouse = async(req,res)=>{
    console.log("Inside addhouse");
    console.log("req ", req);
    
    // res.json("Accepted request")
    console.log(req.files);
    const {
    hostelName,
    location,
    rent,
    deposit,
    propertyType,
    metro,
    busStop,
    vacancy,
    furnishing} = req.body;
    const userMail = req.payload;
    // console.log("email:",req.payload);
    

  var uploadImage = [];

  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    uploadImage = req.files.map((item) => item.filename);
  }
  console.log(
    hostelName,
    location,
    rent,
    deposit,
    propertyType,
    metro,
    busStop,
    vacancy,
    furnishing,
    uploadImage,
    userMail
  );
  try {
    if (!userMail) return res.status(401).json({ error: 'Authentication required' });

    const existingHouse = await House.findOne({ hostelName, userMail });
    if (existingHouse) {
      return res.status(401).json("You have already added the House");
    } else {
      const newHouse = new House({
        hostelName,
    location,
    rent,
    deposit,
    propertyType,
    metro,
    busStop,
    vacancy,
    furnishing,
    uploadImage,
    userMail
      });
      await newHouse.save();
      res.status(200).json({ message: "House Added", newHouse });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
    


//get house - for user
exports.getHouse = async(req,res)=>{
    console.log("inside gethouse details-user");
    
    try {
        const getuserHouse = await House.find()
        res.status(200).json(getuserHouse)
    } catch (error) {
       res.status(500).json("Error"+error) 
    }
}
