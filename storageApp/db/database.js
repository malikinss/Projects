const mongoose = require('mongoose');
const messages = require("../allMessages");

const username = 'malikinssam';
const pass = 'jLW15V4lxEQ1j4H9'
const dbURI = `mongodb+srv://${username}:${pass}@cluster0.zujok.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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