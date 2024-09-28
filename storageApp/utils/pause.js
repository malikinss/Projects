function pause(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

module.exports = pause;