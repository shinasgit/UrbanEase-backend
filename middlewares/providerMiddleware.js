const  jwt = require('jsonwebtoken')

const providerJwtMiddleware = (req,res,next)=>{
    console.log("inside providerJwt Middleware");
    // find token
    const token = req.headers.authorization.slice(7)
    
    console.log(token);
    // verify token
    try {
    const jwtVerification =jwt.verify(token,process.env.jwtKey)
    console.log(jwtVerification);
    req.payload = jwtVerification.email
    req.role=jwtVerification.role
    if(jwtVerification.role == "UEProvider"){
        next()
    }
    else{
        res.status(401).json("Unauthorized User",err)
    }
    
    } catch (error) {
        res.status(501).json("Authentication Error",error)
    }
    
    
}
module.exports = providerJwtMiddleware
