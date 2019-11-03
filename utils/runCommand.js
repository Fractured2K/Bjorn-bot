const ping = require('../commands/ping');
const eightBall = require('../commands/8ball');

runCommand = (message, command) => {
	// available commands
	const commands = {
		ping: () => ping(message),
		'8ball': () => eightBall(message)
	};

	// check if command exists
	if (commands[command]) {
		// run command
		return commands[command]();
	}
};

module.exports = runCommand;
