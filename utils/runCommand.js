const ping = require('../commands/ping');

runCommand = (message, command) => {
	// available commands
	const commands = {
		ping: () => ping(message)
	};

	// check if command exists
	if (commands[command]) {
		// run command
		return commands[command]();
	}
};

module.exports = runCommand;
