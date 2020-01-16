const eightBall = require("../commands/8ball");
const help = require("../commands/help");
const meme = require("../commands/meme");
const ping = require("../commands/ping");
const play = require("../commands/play");
const stop = require("../commands/stop");

executeCommand = message => {
  if (message.content.charAt(0) === "!") {
    // available commands
    const commands = {
      "8ball": () => eightBall(message),
      meme: () => meme(message),
      ping: () => ping(message),
      help: () => help(message),
      play: () => play(message),
      stop: () => stop(message)
    };

    const command = message.content
      .toLowerCase()
      .split("!")
      .join("")
      .split(" ");

    // check if command exists
    if (commands[command[0]]) {
      // run command
      return commands[command[0]]();
    }

    return message.channel.send("Sorry, but that command doesn't exist");
  }
};

module.exports = executeCommand;
