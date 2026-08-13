const mongoose = require('mongoose');

const followShema = new mongoose.Schema({
    followerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    followingId: {type: mongoose.Schema.Types.ObjectId, ref:'User',required: true},
    
},{timestamps: true});

followShema.index({follower: 1, following: 1},{unique:true})

module.exports = mongoose.model('FollowRelationship', followShema);