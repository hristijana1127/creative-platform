const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/',authMiddleware, async(req, res) => {
    try{
        const Notification = await Notification.find({recipient: req.user.id})
            .populate('senderId','username profilePicture')
            .populate('post','title')
            .sort({createdAt: -1})
            .limit(20);
        res.json(notifications);
    }catch(error){
        res.status(500).json({message:"Error fetching notifications.",error:error.message});
    }
});

router.patch('/:id/read',authMiddleware,async(req, res) =>{
    try{
        const notification = await Notification.findOneAndUpdate(
            {_id: req.params.id, recipient: req.user.id},
            {read:true},
            {new:true}
        );
        if(!notification){
            return res.status(404).json({message:"Notification not found."});
        }
        res.json(notification);
    }catch(error){
        res.status(500).json({message:"Error updating notification.",error:error.message});
    }
});
module.exports = router;