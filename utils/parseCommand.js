const eightBall = require("../commands/8ball");
const meme = require("../commands/meme");
const ping = require("../commands/ping");

parseCommand = (message, client) => {
  if (message.content.charAt(0) === "!") {
    // available commands
    const commands = {
      "8ball": () => eightBall(message),
      meme: () => meme(message, client),
      ping: () => ping(message)
    };

    const command = message.content
      .toLowerCase()
      .split("!")
      .join("")
      .split(" ");

    console.log(command);

    // check if command exists
    if (commands[command[0]]) {
      // run command
      return commands[command[0]]();
    }

    return message.channel.send("Sorry, but that command doesn't exist");
  }
};

module.exports = parseCommand;
