const User = require('../models/userModel')
//import jwt fot jwt creation
const jwt = require('jsonwebtoken')

//register
exports.registerUser = async(req,res)=>{
    console.log("Inside register user");
    console.log(req.body);
    
    
    const {username , password , email }= req.body
    console.log({username , password , email});
    try {
        const existingUser = await User.findOne({email})

        if(existingUser){
            res.status(401).json("User is already existing...")
        }
        else{
            const newUser = new User({username , password , email })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json("Error",error)
    }
    
}

//login
exports.loginUser = async(req,res)=>{
    console.log("Inside Login user..");
    // res.send("login user")
    const {email,password} = req.body
    
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            if(existingUser.password === password){

            //token gen
            const token = jwt.sign({email:existingUser.email,role:existingUser.role},process.env.jwtKey)
            console.log(token);
               
            res.status(200).json({message:"Login Successful",user:existingUser,token}) 
            }else{
                res.status(401).json({message:"Password Mismatch"})
            }
            res.status(401).json("Welcome User...")
        }else{
           res.status(401).json({message:"User not Found"}) 
        }
    } catch (error) {
        res.status(500).json("Error",error)
    }
}

//googlr login
exports.googleAuth = async(req,res)=>{
    console.log("Inside Google Login");
    const {email,password,username,profile}=req.body
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            //token gen
            const token = jwt.sign({email:existingUser.email,role:existingUser.role},process.env.jwtKey)
            console.log(token);
               
            res.status(200).json({message:"Login Successful",user:existingUser,token})
        }else{
            const newUser = new User({username , password , email ,profile })
            await newUser.save()
            res.status(200).json(newUser)
            //token gen
            const token = jwt.sign({email:existingUser.email,role:existingUser.role},process.env.jwtKey)
            console.log(token);
            res.status(201).json({message:"Login Successful",user:newUser,token})
        }
    } catch (error) {
        res.status(500).json("Error",error)
    }
}