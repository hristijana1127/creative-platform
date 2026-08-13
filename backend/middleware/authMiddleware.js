const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const authHeader = req.header('Authorization');

    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({message: "No token, authorization denied."});
    }
    try{
        const token = authHeader.split(' ')[1];

        console.log("Token being verified:", token);
        console.log("Secret key being used:", process.env.JWT_SECRET);
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch(error){
        res.status(401).json({message:"Token is no valid or has expired."});
    }
};