const Booking = require("../models/bookModel")



exports.bookItem = async (req, res) => {
    console.log("inside booking ");

    const { userID, username, name, type } = req.body
    console.log({ userID, username, name, type });
    try {
        const bookinguser = await Booking.findOne({userID,name})
        console.log(bookinguser);

        if(bookinguser){
            res.status(401).json("you already booked...")
        }else{
            const newbooking =  new Booking({userID,username,name,type})
            // console.log(email);
            await newbooking.save() 
            res.status(200).json({message:"Booking added",newbooking})
        }

    } catch (error) {
        res.status(500).json("Error",error)
    }

}

exports.getBookAdmin = async(req,res)=>{
    console.log("inside get booking admin ");
    try {
        const getBooking = await Booking.find()
        res.status(200).json(getBooking)
        
    } catch (error) {
        res.status(500).json("Error",error)
    }
}
