const express = require('express');
const router = express.Router();
const Contest = require('../models/Contest');
const Post = require('../models/Post');
const Notification = require('../models/Notification')
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', async(req, res) => {
    try{
        const {title,theme, description, startDate, endDate} = req.body;

        if(!title || !theme || !description || !startDate || !endDate){
            return res.status(400).json({message: "All contest fields are required." });
           }
        const newContest = new Contest({
            title,
            theme,
            description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            submissions:[]
        });

        const savedContest = await newContest.save();
        res.status(201).json(savedContest);
    }catch(error){
        res.status(500).json({message: "Error creating contest.", error: error.message});
    }
});

router.get('/', async(req, res) =>{
    try{
        const contest = await Contest.find().sort({deadline:1});
        res.json(contests);
    }catch(error){
        res.status(500).json({message:"Error fetching contests.", error:error.message});

    }
});

router.post('/:id/submit', authMiddleware, async(req,res) => {
    try{
        const contestId = req.params.id;
        const { postId }= req.body;

        if(!postId){
            return res.status(400).json({message: "Please provide a postId to enter. "});

        }
        const post = await Post.findById(postId);
        if(!post){
            return res.status(400).json({message:"Post not found."});

        }

        const contest = await Contest.findById(contestId);
        if(!contest){
            return res.status(404).json({message: "Contest not found."});
        }

        const alreadySubmitted = contest.submissions.some(sub => sub.postId.toString() === postId);
        if(alreadySubmitted){
            return res.status(400).json({message:"This post has already been submited to this contest!"});

        }
        contest.submissions.push({
            postId,
            userId: req.user.id,
            votes:0
        });
        await contest.save();
        res.json({message:"Successfully entered the contest!", contest});

    }catch(error){
        res.status(500).json({message: "Error asubmitting contest entry.", error: error.message});
    }
});
module.exports = router;

router.post('/:id/vote', authMiddleware, async(req,res) =>{
    try{
        const contestId = req.params.id;
        const {postId} = req.body;

        if(!postId) {
            return res.status(400).json({message: "Please provide a post (postid) to vote for!"});
        }
        const contest = await Contest.findById(contestId);
        if(!contest){
            return res.status(404).json({message: "Contest not found."});
        }

        const submission = contest.submissions.find(sub => sub.postId.toString() === postId);
        if(!submission){
            return res.status(404).json({message: "This post is not a submission in this contest."});
        }
        const hasVoted = submission.voters.some(voterId => voterId.toString() === req.user.id);

        if(hasVoted){
            return res.status(400).json({message: "You have already voted for this post! "});

        }

        submission.voters.push(req.user.id);
        submission.votes = submission.voters.lenght;
        
        await contest.save();
        
        res.json({
            message: "Vote cast success!",
            postId: submission.postId,
            newVoteCount: submission.votes
        });

    }catch(error){
        res.status(500).json({message: "Error casting vote.", error:error.message});

    }
});


router.get('/:id', async(req,res) => {
    try{
        const contest = await Contest.findById(req.params.id)
            .populate('submissions.postId','title fileUrl format description')
            .populate('submissions.userId','username');
            if(!contest){
                return res.status(404).json({message: "Contest not found."});
            }
            
            contest.submission.sort((a,b) => b.votes - a.votes);
            
            res.json(contest);
    }catch(error){
        res.status(500).json({message: "Error fetching contest details.",error: error.message});
    }
});

router.post('/:id/close',authMiddleware, async(req,res) => {
    try{
        const contest = await Contest.findById(req.params.id);

        if(!contest){
            return res.status(404).json({message: "Contest not found"});

        }
        if(!contest.isActive){
            return res.status(400).json({message: "This contest has already finalized."})
        }
        if(contest.submissions.length == 0){
            contest.isActive = false;
            await contest.save();
            return res.json({message: "Contest closed with zero submissions. No winner chosen.",contest});

        }

        contest.submissions.sort((a,b) => b.votes - a.votes);
        const winningSubmission = contest.submissions[0];

        contest.winnerPostId = winningSubmission.postId;
        contest.isActive = false;

        await contest.save();

        res.json({
            message:"Contest officially closed! A winner has been crowned.",
            winnerPostId: content.winnerPostId,
            winningVotes: winningSubmission.votes,
            contest
        });
        await Notification.create({
            recipientId: winningSubmission.userId,
            senderId: req.user.id,
            type:'contest_win',
            post: winningSubmission.postId
        });
    }catch(error){
        res.status(500).json({message: "Error finalizing contest.",error:error.message});
    }
});

