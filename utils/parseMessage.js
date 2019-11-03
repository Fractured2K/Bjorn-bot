const runCommand = require('./runCommand');

/*
 * Parses incoming message into a command
 */

parseMessage = message => {
	const command = message.content.toLowerCase().split('!');
	return runCommand(message, command[1]);
};

module.exports = parseMessage;
