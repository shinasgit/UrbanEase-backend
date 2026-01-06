const jwt = require("jsonwebtoken")

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwt MW");
    //Find token
    const authHeader = req.headers && req.headers.authorization;
    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authentication Error', message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.slice(7);
    console.log(token);

    try {
        const jwtVerification = jwt.verify(token, process.env.jwtKey);
        console.log(jwtVerification);
        req.payload = jwtVerification.userMail;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentication Error', message: error.message });
    }
    

    
}

module.exports = jwtMiddleware 