// Import the necessary libraries
const mongoose = require('mongoose');
const bot = require('./bot');
const config = require('./config');

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB is connected'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Launch the bot
bot.startPolling();
