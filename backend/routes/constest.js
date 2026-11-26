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
        const contests = await Contest.find().sort({endDate: -1});
        res.json(contests);
    }catch(error){
        res.status(500).json({message:"Error fetching contests.", error:error.message});
    }
});

router.get('/:contestId/submissions',authMiddleware,async(req,res) => {
    try{ 
        const {contestId} = req.params;

        const contest = await Contest.findById(contestId)
            .populate({
                path:'submissions.postId',
                select: 'title fileUrl format description userId createdAt parentPostId',
                populate:{
                    path:'userId',
                    select:'username name profilePicture'
                }
            })
            .populate(
                'submissions.userId',
                'username name profilePicture'
            );
            if(!contest){
                return res.status(404).json({
                    message:"Contest not found"
                });
            }

            const submissions = [...contest.submissions]
                .sort((a,b) => b.votes - a.votes);

            res.json(submissions);

    }catch(error){
        console.error('Error fetching submissions:',error);

        res.status(500).json({
            message:'Error fetching contest submissions',
            error:error.message
        });
    }
});


router.post('/:contestId/submissions', authMiddleware, async(req,res) => {
    try{
        const contestId = req.params.contestId;
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

        if (post.userId.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: 'You can only submit your own posts'
            });
        }

        const alreadySubmitted = contest.submissions.some(sub => sub.postId.toString() === postId);
        if(alreadySubmitted){
            return res.status(400).json({message:"This post has already been submited to this contest!"});

        }
        contest.submissions.push({
            postId,
            userId: req.user.id,
            votes:0,
            voters:[]
        });
        await contest.save();
        res.json({message:"Successfully entered the contest!", contest});

    }catch(error){
        res.status(500).json({message: "Error asubmitting contest entry.", error: error.message});
    }
});


router.get('/:contestId', async(req,res) => {
    try{
        const contest = await Contest.findById(req.params.contestId)
            .populate('winnerPostId','title fileUrl format description userId')
            .populate({
                path:'submissions.postId',
                select:'title fileUrl format description'})
            .populate('submissions.userId','username name profilePicture');
            if(!contest){
                return res.status(404).json({message: "Contest not found."});
            }
            
            contest.submissions.sort((a,b) => b.votes - a.votes);
            
            const topSubmissions = [...contest.submissions]
                .sort((a,b) => b.votes - a.votes)
                .slice(0,3);
            res.json({
                _id:contest._id,
                title: contest.title,
                theme: contest.theme,
                description: contest.description,
                startDate: contest.startDate,
                endDate: contest.endDate,
                isActive: contest.isActive,
                winnerPostId: contest.winnerPostId,
                topSubmissions
            });
    }catch(error){
        res.status(500).json({
            message: "Error fetching contest details.",error: error.message
        });
    }
});


router.post('/:contestId/vote', authMiddleware, async(req,res) =>{
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
        submission.votes = submission.voters.length;
        
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

router.post('/:contestId/close',authMiddleware, async(req,res) => {
    try{
        const contest = await Contest.findById(req.params.contestId);

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
            winnerPostId: contest.winnerPostId,
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

module.exports = router;