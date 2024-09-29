require('dotenv').config();
const mongoose = require('mongoose');
const messages = require("../allMessages");

const dbURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PSWD}@cluster0.zujok.mongodb.net/myDatabase?authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log(messages.success.dbSuccess);
    } catch (error) {
        console.error(messages.error.dbFail, error);
        process.exit(1);
    }
};

module.exports = connectDB;
