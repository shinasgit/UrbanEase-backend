const Helper = require("../models/helpModel")

exports.addHelp = async(req,res)=>{
    console.log("Inside add Helpcontact");
    // console.log(req.body);

    const {jobType , name , number, station ,location ,phonenumber}= req.body
        console.log({jobType , name , number, station ,location ,phonenumber });
        try {
            const existingHelp = await Helper.findOne({number , phonenumber})
    
            if(existingHelp){
                res.status(401).json("HelpContact is already existing...")
            }
            else{
                const newHelp = new Helper({jobType , name , number, station ,location ,phonenumber })
                await newHelp.save()
                res.status(200).json({message:"Help Added",newHelp})
            }
        } catch (error) {
            res.status(500).json("Error",error)
        }
        
    }
