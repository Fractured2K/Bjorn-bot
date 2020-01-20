const fs = require("fs").promises;
import { Message } from "discord.js";

export const executeCommand = async (message: Message) => {
  // load commands
  try {
    if ((message.client as any).commands.size == 0) {
      await _loadCommands(message);
    }

    // parse command form message
    const commandArg = message.content
      .toLowerCase()
      .slice(1)
      .split(" ")[0];

    const command = (message.client as any).commands.get(commandArg);

    if (command) {
      return command[Object.keys(command)[0]](message);
    } else {
      return message.channel.send("Sorry, but that command doesn't exist");
    }
  } catch (error) {
    console.log(error);
  }
};

async function _loadCommands(message: Message) {
  // list of possible commands
  const commands = await fs.readdir(__dirname + "/../commands");

  // set list of possible commands
  for (const file of commands) {
    const fileName = file
      .split(".")
      .slice(0, -1)
      .join(".");

    const command = require(`../commands/${file}`);
    (message.client as any).commands.set(fileName, command);
  }
}
