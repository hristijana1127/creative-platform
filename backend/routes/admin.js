const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const User = require("../models/User");
const Post = require('../models/Post')
const Contest = require("../models/Contest");

router.get(
    "/stats",
    authMiddleware,
    adminMiddleware,
    async(req, res) => {
        try{
            const users = await User.countDocuments();
            const posts = await Post.countDocuments();
            const contests = await Contest.countDocuments();
            const activeContests = await Contest.countDocuments({
                isActive: true
            });

            res.json({
                users,
                posts,
                contests,
                activeContests
            });
        }catch(error){
            console.error("ADMIN STATS ERROR",error);
            res.status(500).json({
                message:"Error getting admin statistics",
                error:error.message
            });
        }
    }

);

router.get("/users" , authMiddleware, adminMiddleware, 
    async(req,res) =>{
        try{
            const users = await User.find()
            .select("-password")
            .sort({createdAt: -1});

            res.json(users);
        } catch(error){
            console.log(error);

            res.status(500).json({
                message:"Error fetching users",
            });
        }
    } 
);

router.get("/posts", authMiddleware, adminMiddleware,  async(req, res) => {
        try{
            const posts = await Post.find()
            .populate("userId", "username profilePicture")
            .sort({createdAt: -1});

            res.json(posts);
        }catch(error){
            console.error(error);
            res.status(500).json({
                message:"Error fetching posts",
            });
        }
    }
);

router.get("/contests", authMiddleware, adminMiddleware, async(req, res) => {
    try{
        const contests = await Contest.find().sort({startDate : -1});

        res.json(contests);

    }catch(error){
        console.error(error);

        res.status(500).json({
            message:"Error fetching contests",
        });
    }
});

router.post("/:contestId/close",authMiddleware,adminMiddleware,async (req, res) => {
        try {
            const { contestId } = req.params;

            const contest = await Contest.findById(contestId);

            if (!contest) {
                return res.status(404).json({ message: "Contest not found"
                });
            }

            if (!contest.isActive) {
                return res.status(400).json({message: "Contest is already closed"
                });
            }

            // Sort submissions by votes
            const sortedSubmissions = [...contest.submissions].sort(
                (a, b) => b.votes - a.votes
            );

            // Set winner
            if (sortedSubmissions.length > 0) {contest.winnerPostId = sortedSubmissions[0].postId;
            }

            contest.isActive = false;

            await contest.save();

            res.json({
                message: "Contest closed successfully",
                winnerPostId: contest.winnerPostId
            });

        } catch (error) {
            console.error("Error closing contest:", error);

            res.status(500).json({
                message: "Error closing contest",
                error: error.message
            });
        }
    }
);
module.exports = router;
