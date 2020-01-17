const fs = require("fs").promises;

executeCommand = async message => {
  // load commands
  if (!message.client.commands.size > 0) {
    await _loadCommands(message);
  }

  // parse command form message
  const commandArg = message.content
    .toLowerCase()
    .slice(1)
    .split(" ")[0];

  const command = message.client.commands.get(commandArg);

  if (command) {
    return command(message);
  }

  return message.channel.send("Sorry, but that command doesn't exist");
};

async function _loadCommands(message) {
  // list of possible commands
  const commands = await fs.readdir(__dirname + "/../commands");
  // set list of possible commands
  for (const file of commands) {
    const command = require(`../commands/${file}`);
    message.client.commands.set(command.name, command);
  }
}

module.exports = executeCommand;
