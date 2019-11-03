const commands = require('../commands/commands');

/*
 * Parses incoming message into a command
 */

parseCommand = message => {
	const command = message.content.toLowerCase().split('!');
	return commands(message, command[1]);
};

module.exports = parseCommand;
