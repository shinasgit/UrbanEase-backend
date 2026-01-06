const Appliance = require("../models/appModel")

exports.addApp = async(req,res)=>{
    console.log("Inside add appliance");
    // console.log(req.body);

    const {product , brand , type }= req.body
        console.log({product , brand , type });
        try {
            const existingApp = await Appliance.findOne({product , brand , type })
    
            if(existingApp){
                res.status(401).json("Appliance is already existing...")
            }
            else{
                const newApp = new Appliance({product , brand , type })
                await newApp.save()
                res.status(200).json({message:"Appliance Added",newApp})
            }
        } catch (error) {
            res.status(500).json("Error",error)
        }
        
    }
