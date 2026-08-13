
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{type: String, required: true,unique: true},
    email:{type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    name: {type: String, required: true},
    profilePicture: {type: String, default: "../assets/astronaut.png"},
    bio:{type: String, default :""},
    badges: [{type: String}],
    createdAt: {type: Date, default: Date.now},
    lastLogin:{ type: Date},
    notificationSettings: {
        onFollow: {type: Boolean, default: true},
        onComment:{type: Boolean, default: true},
        onRemixRequest: { type: Boolean, default: true}
    },
    role:{ type: String, enum: ['user','admin'], default:'user'},
},{timestamps : true});

module.exports = mongoose.model('User',userSchema);