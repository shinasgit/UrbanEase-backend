const  jwt = require('jsonwebtoken')

const adminJwtMiddleware = (req,res,next)=>{
    console.log("inside admin Jwt Middleware");
    // find token
    const token = req.headers.authorization.split(" ")?.[1]
    
    console.log(token);
    // verify token
    try {
    const jwtVerification =jwt.verify(token,process.env.jwtKey)
    console.log(jwtVerification);
    req.payload = jwtVerification.email
    req.role=jwtVerification.role
    if(jwtVerification.role == "UEAdmin"){
        next()
    }
    else{
        res.status(401).json("Unauthorized User",err)
    }
    
    } catch (error) {
        res.status(401).json("Authentication Error",error)
    }
    
    
}
module.exports = adminJwtMiddleware




















