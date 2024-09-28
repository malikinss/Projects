const messages = require('../../allMessages');
const clear = require("clear");
const pause = require("../../utils/pause");

const manageExit = async() => {
    clear();
    await pause(250);
    console.log(messages.success.exit);
    process.exit(0);
}

module.exports = manageExit;