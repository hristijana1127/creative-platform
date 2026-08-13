const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

const users = [];

router.post('/register', async(req, res)=>{
    try{
    const {username,email, password,name} = req.body;

    if(!username || !email ||!password || !name){
        return res.status(400).json({message: " Please fill in all required fields."});
    }

    const existingUser = await User.findOne({
        $or: [{email}, {username}]
    });
    if(existingUser){
        return res.status(400).json({message: "Username or email is already taken."});
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

   const newUser = new User({
    username,
    email,
    passwordHash,
    name
   });
   const savedUser = await newUser.save();
   const token =jwt.sign(
    {id: savedUser._id},
    process.env.JWT_SECRET,
    {expiresIn: '7d'}
   );
    res.status(201).json({
       token, 
       user:{
        id:savedUser._id,
        username: savedUser.username,
        name:savedUser.name,
        email: savedUser.email
       }
    });
} catch(error){
    res.status(500).json({message: "Server error during registration.", error: error.message});
}
});


router.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body;
        
        
         if(!email || !password){
            return res.status(400).json({message:"Please provide both email and password"});

        }
        //const user = users. find(u => u.username === username);
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message:"Invalid credntials"});

        }
        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credntials"});

        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"});

        res.json({token,
            user:{
                id: user._id,
                username: user.username,
                name:user.name,
                email: user.email
            }

        });
    }catch(error){
        res.status(500).json({ message: "Server error during login.", error: error.message })
    }
    });
/*
    router.get('/protected', (req,res) => {
        const token = req.headers['authorization'];

        if(!token){
            return res.status(401).json({message: 'No token provided'});

        }
        try{
            const decoded = jwt.verify(token, 'secretKey');
            res.json({message: 'Protected route', user:dcoded});
        }catch(error){
            res.status(401).json({message:'Invalid token'});
        }
    
});*/
module.exports = router;