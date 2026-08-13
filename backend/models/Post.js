const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    title:{type: String, required: true },
    format: {type: String, enum:['audio', 'image','text','video'], required: true},
    fileUrl:{type:String, required: true},
    description: {type: String, default:""},

    parentPostId:{type: mongoose.Schema.Types.ObjectId, ref:'Post',default:null},
    remixStatus: { type:String, enum:['none', 'pending','approved','rejected'], default:'none'},

    contestId:{type:mongoose.Schema.Types.ObjectId, reg:'Contest', default:null},

    tags:[{type:String}],
    categories:[{type:String}],

    likes:[{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    viewCount:{type: Number , default:0},
    createdAt:{type: Date , default: Date.now}
})

module.exports = mongoose.model('Post',postSchema);