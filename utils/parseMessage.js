const runCommand = require('./runCommand');

/*
 * Parses incoming message into a command
 */

parseMessage = message => {
	if (message.content.charAt(0) === '!') {
		const command = message.content
			.toLowerCase()
			.split('!')
			.join('')
			.split(' ');

		return runCommand(message, command[0]);
	}
};

module.exports = parseMessage;
