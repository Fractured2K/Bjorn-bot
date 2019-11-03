const ping = require('./ping');

commands = (message, command) => {
	// Create commands object
	const commands = {
		ping: () => ping(message)
	};

	// Check if command exists
	if (commands[command]) {
		// If command exists run it
		return commands[command]();
	}
};

module.exports = commands;
