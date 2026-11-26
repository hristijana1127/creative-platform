const express = require("express");
const router = express.Router();
const ContestVote = require('../models/ContestVote');
const Contest = require("../models/Contest");
const Post = require('../models/Post');
const authMiddleware = require('../middleware/authMiddleware');

// route firstly is /votes
//create votee
router.post('/:contestId/:postId/votes', authMiddleware, async(req,res) => {
    try{
        const {contestId, postId} = req.params;

        const userId = req.user.id;

        const contest = await Contest.findById(contestId);

        if(!contest){
            return res.status(404).json({
                message:"Contest not found.",
            });
        }
        const post = await Post.findById(postId);
        if(!post) {
            return res.status(404).json({
                message:"Post not found.",
            });
        }
        const existingVote = await ContestVote.findOne({
            contestId,
            postId,
            userId,
        });
        if(existingVote) {
            return res.status(409).json({
                message: "You have already voted for this post.",
            });
        }
        const newVote = new ContestVote({
            contestId,
            userId,
            postId,
        });
        await newVote.save();
        res.status(201).json({
            message:"Vote added successfully.",
            vote:newVote,
        });
    }catch(error){
        console.error("Error adding vote:",error);
        res.status(500).json({
            message:"Error adding vote.",
            error:error.message,
        });
    }
});

//get vote info

router.get("/:contestId/posts/:postId/votes", authMiddleware, async(req, res) => {
    try{
        const {contestId,postId} = req.params;
        const userId = req.user.id;

        const totalVotes = await ContestVote.countDocuments({
            contestId,
            postId,
        });
        const userVote = await ContestVote.findOne({
            contestId,
            postId,
            userId,
        });
       res.json({ totalVotes, 
        hasVoted: !!userVote,});

    }catch(error){
        console.error("Error fetching votes:",error);
        res.status(500).json({
            message:"Error fetching votes.",
            error:error.message,
        });
    }
}
);
router.delete( "/:contestId/posts/:postId/vote", authMiddleware, async (req, res) => { 
    try { 
        const { contestId, postId } = req.params;
        const userId = req.user.id;
        const vote = await ContestVote.findOne({ contestId, postId, userId, }); 
        
        if (!vote) {
             return res.status(404).json({ message: "Vote not found.", }

             ); }
        await ContestVote.findByIdAndDelete(vote._id); 
        
        res.json({
             message: "Vote removed successfully.", 
            });
         } catch (error) {
             console.error("Error removing vote:", error); 
             
             res.status(500).json({
                 message: "Error removing vote.", 
                 error: error.message, 
                });
            } 
    } 
);

module.exports = router;

