const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require("../middleware/uploadMiddleware");
const cloudinary = require('../config/cloudinary');


router.post('/', authMiddleware, upload.single('file'), async(req, res) => {
    try{

        const{title, description, format, parentPostId} = req.body;

        if(!title || !format ){
            return res.status(400).json({message: "Title, format, and file URL are required!"});
        }

        if(!req.file){
            return res.status(400).json({message: "No file uploaded. Please select a creative file."});
        }

        const uploadStream = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder:'toTheWorld_uploads',
                        resource_type:"auto"
                    },
                    (error, result) => {
                        if(result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(req.file.buffer);
            });
        };
        const cloudinaryResult = await uploadStream();

        const newPost = new Post({
            title,
            description,
            format,
            fileUrl: cloudinaryResult.secure_url,
            userId: req.user.id,
            parentPostId: parentPostId || null
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }catch(error){
        res.status(500).json({message: "Error creating post.", error:error.message });
    }
});

router.get('/',async(req, res) => {
    try{
    const posts = await Post.find()
    .populate('userId','username name profilePicture')
    .sort({createdAt: -1});

    res.json(posts);
    }catch(error){
        res.status(500).json({message:"Error fetching posts", error:error.message});
    }
});

module.exports = router;



router.get('/:id/remixes', async(req, res) => {
    try{
        const originalPostId = req.params.id;

        const originalPost = await Post.findById(originalPostId);
        if(!originalPost){
            return res.status(404).json({message: "Original post not found."});

        }
        const remixes = await Post.find({parentPostId: originalPostId})
            .populate("userId",'username')
            .sort({createdAt: -1});

            res.json({
                originalPostTitle: originalPost.title,
                totalRemixes: remixes.length,
                remixes: remixes
            });
    }catch(error){
        res.status(500).json({message:"Error fetching remixes.",error: error.message});
    }
});

router.put('/:id', authMiddleware, async( req,res) =>{
    try{
        const post = await Post.findById(req.params.id);
        
        if(!post){
            return res.status(404).json({message: "Post not found."});
        }
        if(post.userId.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(403).json({message: "Not authoruzed to update this post!"});
        }
        const{title, description, format} = req.body;
        if(title) post.title = title;
        if(description !== undefined) post.description = description;
        if(format) post.format = format;

        await post.save();
        res.json({message : "Post updated successfully.", post});

    }catch(error){
        res.status(500).json({message:"Error updating post.", error: error.message});

    }
});

router.delete('/:id', authMiddleware, async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        
        if(!post){
            return res.status(404).json({message: "Post not found."});

        }
        if(post.userId.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(403).json({message : "Not authorized to delte this post!"});
        }
        const Comment = require('../models/PostComment');
        await Comment.deleteMany({postId: req.params.id});

        await Post.findByIdAndDelete(req.params.id);

        res.json({message: "Post andall related comments deleted succesfully."})
    }catch(error){
        res.status(500).json({message:"Error deleting post.", error:error.message});}
});

router.get('/', async(req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page -1) * limit;

        const{ format, search} = req.query;

        let query = {};

        if(format){
            query.format = format;
        }
        if(search){
            query.$or = [
                {title :{$regex: search, $options:'i'}},
                {description:{$regex: search, $options: 'i'}}
            ];
        }
        const totalPosts = await Post.countDocuments(query);
        const posts = await Post.find(query)
            .populate('userId', 'username profilePicture')
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit);

        res.json({
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalPosts,
            posts
        });
    }catch(error){
        res.status(500).json({message:"Error fetching posts feed.",error:error.message});
    }
})