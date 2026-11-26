const jwt = require('jsonwebtoken');
const User = require("../models/User")

module.exports = async function(req, res, next){
    const authHeader = req.header('Authorization');

    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: "No token, authorization denied."});
    }
    try{
        const token = authHeader.split(' ')[1];
       

        console.log("Token being verified:", token);
        console.log("Secret key being used:", process.env.JWT_SECRET);
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
      const user = await User.findById(decoded.id).select("-passwordHash");

      if(!user){
        return res.status(401).json({
            message:"User not found."
        });
      }
      req.user = user;

        next();
    } catch(error){
        console.error("Auth middleware error:",error);
        
        res.status(401).json({message:"Token is no valid or has expired."});
    }
};