const commands = require('../commands/commands');

/*
 * Parses incoming message into a command
 */

parseCommand = message => {
	try {
		const command = message.content.toLowerCase().split('!');
		return commands(message, command[1]);
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = parseCommand;
