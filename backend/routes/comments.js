const express = require('express');
const router = express.Router();
const Comment = require('../models/PostComment');
const Post = require('../models/Post');
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/:postId/comments', authMiddleware, async(req, res) => {
    try{
        const { text } = req.body;
        const { postId }= req.params;

        if(!text || text.trim() === ''){
            return res.status(400).json({message: "Comment text cannont be empty."});

        }
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({message: "Post not found."});
        }
        const newComment = new Comment({
            postId,
            userId: req.user.id,
            commentText
        });
        await newComment.save();
        await newComment.populate('userId', 'username profilePicture');
        
        if(post.userId.toString() !== req.user.id){
            await Notification.create({
                recipientId:post.userId,
                senderId:req.user.id,
                type:'comment',
                post:postId
            })
        }
        res.status(201).json(newComment);
    }catch(error){
        res.status(500).json({message:"Error adding comment.", error: error.message});
    }
});


router.get('/:postId/comments', async(req, res) => {
    try{
        const comments = await Comment.find({postId: req.params.postId})
            .populate('userId', 'username profilePicture')
            .sort({createdAt : -1});

        res.json({
            totalComments: comments.length,
            comments
        });
    }catch(error){
        res.status(500).json({message:"Error fetching comments.", error:error.message});
    }
});


router.delete('/:postId/comments/:commentId', authMiddleware, async(req, res) => {
    try{
        const {postId, commentId} = req.params;
        const comment = await Comment.findById(commentId);

        if(!comment){
            return res.status(400).json({message : "Comment not found"});
        }
        const post = await Post.findById(postId);

        const isCommentAuthor = comment.userId.toString() === req.user.id;
        const isPostOwner = post && post.userId.toString() === req.user.id;
        const isAdmin = req.user.role === 'admin';

        if(!isCommentAuthor && !isPostOwner && isAdmin){
            return res.status(403).json({message:"Not authorized to delete this comment"});
        }
        await Comment.findByIdAndDelete(commentId);
        res.json({message:"Comment deleted successfully."});
    }catch(error){
        res.status(500).json({message: "Error deleting comment.", error: error.message});
    }
});

module.exports = router;