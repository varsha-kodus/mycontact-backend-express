const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async(req, res, next) =>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization token is missing or malformed" });
    }

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        console.log('Tokennnn---',token);

        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing in request");
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                console.log(err);
                
                res.status(401);
                throw new Error("Invalid or expired token");
            }
            req.user = decoded.user;

 
            next();
            
        });
    }

    
});

module.exports = validateToken;