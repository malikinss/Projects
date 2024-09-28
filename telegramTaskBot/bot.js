// Import the necessary libraries
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
require("dotenv").config();
const Task = require("./models/task");

const MS_PER_HOUR = 60 * 60 * 1000;

const emoji = {
    angel: '\u{1F607}',
    smile: '\u{1F60A}',
    question: '\u{1F9D0}',
    hi: '\u{1F44B}',
    ticket: '\u{1F3AB}',
    options: '\u{1F5C3}',
    calendar: '\u{1F5D3}',
    pin: '\u{1F4CD}',
}


const messages = {
    start:`Hi there! ${emoji.hi}\nUse /help to know your opportunities ${emoji.question}`,
    help:  `${emoji.options}Options:\n${emoji.pin} /addtask <task> - Add task\n${emoji.pin} /listtasks - List all tasks\n${emoji.pin} /removetask <ID> - Delete task\n${emoji.pin} /updatetask <ID> <updated_task> - Update task`,
}

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGODB_URI).then(() => {
    console.log("Connection to MongoDB successful!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Get the token from the environment variables
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Function for sending reminders
const sendReminders = async () => {
  const now = new Date();

  // Find tasks that are due soon (within 1 hour)
  const upcomingTasks = await Task.find({
    completed: false,
    dueDate: { $lt: new Date(now.getTime() + MS_PER_HOUR), $gt: now },
  });

  upcomingTasks.forEach((task) => {
    bot.sendMessage(
      task.chatId,
      `Reminder! Task "${
        task.description
      }" must be completed before ${task.dueDate.toLocaleTimeString()}.`
    );
  });
};

// Function for adding a task
const addTask = async (chatId, description, dueDate) => {
  try {
    const task = new Task({ chatId, description, dueDate });
    await task.save();
    return "Task added succesfully!";
  } catch (err) {
    console.error("Error adding task:", err);
    return "Error adding task:.";
  }
};

// Функция для завершения задачи
const completeTask = async (chatId, taskDescription) => {
  try {
    const task = await Task.findOneAndUpdate(
      { chatId, description: taskDescription },
      { completed: true }
    );
    if (task) {
      return `Task "${taskDescription}" marked as completed.`;
    } else {
      return `Task "${taskDescription}" not found.`;
    }
  } catch (err) {
    console.error("Error while completing task:", err);
    return "Error while completing task.";
  }
};


// Processing the /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, messages.start);
});

// Processing the /help command
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, messages.help);
});

// Processing the /addtask command
bot.onText(/\/addtask (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const taskDescription = match[1]; // Get the task description from the command
  
    // Calculate the due date 1 day from the current time
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 1);
  
    const response = await addTask(chatId, taskDescription, dueDate);
  
    bot.sendMessage(chatId, response);
});

// Processing the /listtasks command
bot.onText(/\/listtasks/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const tasks = await Task.find({ chatId });
    if (tasks.length === 0) {
      bot.sendMessage(chatId, "You have no current tasks.");
    } else {
      let response = "Your current tasks:\n";
      tasks.forEach((task) => {
        response += `- ${
          task.description
        } (до ${task.dueDate.toLocaleDateString()})\n`;
      });
      bot.sendMessage(chatId, response);
    }
  } catch (err) {
    console.error("Error while getting tasks:", err);
    bot.sendMessage(chatId, "Error while getting tasks.");
  }
});

// Processing the /complete command
bot.onText(/\/complete (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const taskDescription = match[1]; // Get the task description
  const response = await completeTask(chatId, taskDescription);
  bot.sendMessage(chatId, response);
});



/*
// Processing the /removetask command
bot.onText(/\/removetask (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const taskId = match[1];
  await Task.findByIdAndDelete(taskId); // Delete task by ID
  bot.sendMessage(chatId, "Task removed succesfully!");
});

// Processing the /updatetask command
bot.onText(/\/updatetask (.+) (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const [taskId, newText] = match.slice(1); // Get the task ID and new text
  await Task.findByIdAndUpdate(taskId, { text: newText });
  bot.sendMessage(chatId, "Task updated succesfully!");
});*/




// Run the check every hour
setInterval(sendReminders, MS_PER_HOUR);
console.log("The bot is up and running...");

module.exports = bot;
