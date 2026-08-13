const mongoose = require('mongoose');

const contestVoteSchema = new mongoose.Schema({
    contestId:{type: mongoose.Schema.Types.ObjectId, ref: 'Contest', required: true},
    userId : {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    postId:{type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('ContestVote', contestVoteSchema);