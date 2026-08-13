const express = require('express');
const router = express.Router();
const Follow  = require('../models/FollowRelationship');
const User = require('../models/User');

const Notification = require('../models/Notification');

const authMiddleware = require('../middleware/authMiddleware');


router.post('/:id/follow', authMiddleware, async(req, res) =>{
    try{
        const targetUserId = req.params.id;
        const currentUserId = req.user.id;

        if(currentUserId === targetUserId){
            return res.status(400).json({message: "You cannot follow yourself."});

        }
        const targetUser = await User.findById(targetUserId);
        if(!targetUser) {
            return res.status(404).json({message: "User to follow not found."});
        }

        const newFollow = new Follow({
            follower: currentUserId,
            following: targetUserId
        });

        
        await Notification.create({
            recipientId: targetUserId,
            senderId: currentUserId,
            type:'follow'
        }) ;
        await newFollow.save();
        res.status(201).json({message: `You are now following ${targetUserId.username}.`})
    }catch(error){
        if(error.code === 11000){
            return res.status(400).json({message: "You are already following this user."});
        }
        res.status(500).json({ message: "Error following user.", error: error.message});
    }
});



router.delete('/:id/follow', authMiddleware, async(req, res) =>{

    try{
        const targetUserId = req.params.id;
        const currentUserId = req.user.id;

        const deletedFollow = await Follow.findOneAndDelete({
            follower: currentUserId,
            following: targetUserId
        });
        if(!deletedFollow){
            return res.status(400).json({message:"You were not following this user."});

        }
        res.json({message : "Succesfully unfollowed user."});

    }catch(error){
        res.status(500).json({message: "Error unfollowing user.",error: error.message});
    }
});


router.get('/:id/followers', async(req,res) =>{
    try{
        const followers = await Follow.find({following: req.params.id}).populate('follwer',  'username profilePicture bio');

        res.json({
            totalFollowers: followers.length,
            followers: followers.map(f => f.followers)
        });
    }catch(error){
        res.status(500).json({message: " Error fetching followers.", error: error.message});
    }
});


router.get('/:id/following',async(req, res) =>{
    try{
        const following = await Follow.find({follower: req.params.id}).populate('following','username profilePicture bio');

        res.json({
            totalFollowing: following.length,
            following: following.map(f => f.following)
        });

    }catch(error){
        res.status(500).json({message : "Error fetching following list.", error: error.message});
    }
});
module.exports = router;


router.get('/feed',authMiddleware, async(req,res) =>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.parse.limit) || 10;
        const skip = (page - 1) * limit;

        const Follow = require('../models/Follow');
       
        const followUsers = await Follow.find({follower:  req.user.id}).select('following');
        const followedUserId = followedUsers.map(f => f.following);

        
        const totalPosts = await Post.countDocuments({userId: {$in: followedUserIds}});
        const posts = await Post.find({userId: {$in:followedUserIds}})
            .populate('userId','username profilePicture')
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit);
        
        res.json({
            currntPage:page,
            totalPages:Math.ceil(totalPosts / limit),
            totalPosts,
            posts
        });
    }catch(error){
        res.status(500).json({message:"Error fetching personalized feed.",error:error.message});
    }
});
