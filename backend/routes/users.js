const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');
const cloudinary = require('../config/cloudinary');

router.get('/:id', async(req, res) => {
    try{
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found."});
        }

        const userPost = (await Post.find({userId: req.params.id})).toSorted({ createdAt: -1});

        res.json({
            user,
            totalPosts: userPosts.length,
            post: userPosts
        });
    }catch(error){
        res.status(500).json({message:"Error fetching user profile.", error: error.message});
    }
});

router.put('/profile', authMiddleware, upload.single('avatar'), async(req,res) => {
    try{
        const{bio, username} = req.body;
        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({message:"User not found."});
        }
        if(bio !== undefined) user.bio = bio;
        if(username) user.username = username;

        //upload a new profile picture
        if(req.file){
            const uploadStream = () => {
                return new Promise((resolve, rejenct) => {
                    const stream = coudinary.uploader.upload_stream(
                        { folder: "user_profilePics", resource_type:"image"},
                    (error, result) => {
                        if(result) resolve(result);
                        else reject(error);
                    });
                    stream.end(req.file.buffer);
                });

            };
            const result = await uploadStream();
            user.pictureUrl = result.secute_url;
        }
        await user.save();

        //hide password in output
        const updateUser = user.toObject();
        delete updatedUser.password;

        res.json({message: "Profile updated successfully!", user: updatedUser});
    }catch(error){
        res.status(500).json({message: "Error updating profile.", error: error.message});
    }
})

router.get('/admin/all', authMiddleware, adminMiddleware, async(req, res) =>{
    try{
        const users = await User.find().select("-password").sort({createdAt: -1});
    }catch(error){
        res.status(500).json({messaage: "Error fetching users.", error:error.message});
    }
});

router.delete('/admin/:id',authMiddleware, adminMiddleware, async (req, res) => {
    try{
        const userToDelete = await User.findById(req.params.id);
        if(!userToDelete){
            return res.status(404).json({message: "User not found."});
        }
        await Post.deleteMany({userId: req.params.id});
        await User.findByIdAndDelete(req.params.id);

        res.json({message: "User account and associated content succefully removed."});
    }catch(error){
        res.status(500).json({message: "Error deleting user.",error:error.message});
    }
})
module.exports = router;