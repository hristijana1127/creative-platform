const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    theme:{type:String, required: true},
    description:{type: String, required: true},
    startDate:{type: Date, required: true},
    endDate:{type: Date, required: true},
    isActive: {type: Boolean, default: true},
    submissions: [
        {
            postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            votes: { type: Number, default: 0 },

            voters:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
        }
    ],
    winnerPostId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', default: null}
});

module.exports = mongoose.model('Contest', contestSchema)