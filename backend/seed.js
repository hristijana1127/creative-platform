const mongoose = require('mongoose');
const User = require('./models/User');
const Contest = require('./models/Contest');
const Post = require ('./models/Post')
const testData = require('./testValues/UserValues.json')
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
async function seedDB(){
    try{
        await mongoose.connect(MONGODB_URI);

        await User.deleteMany({});
        await Post.deleteMany({});
        await Contest.deleteMany({});
        console.log("Cleared old Users and Contests.")
        
        if(testData.user){
             await User.insertMany(testData.user);
        }
        if(testData.post){
            await Post.insertMany(testData.post);
        }
       if(testData.contest){
        await Contest.insertMany(testData.contest);
       }
        console.log("Dummy Data loaded into MOngoDB");

        await mongoose.disconnect();
        console.log('Disconected from MongoDb. Seeding COmplete');
        proccess.exit(0);
    }catch (error){
        console.log("Error seeding DB:", error);
        process.exit(1);
    }
}

seedDB();

