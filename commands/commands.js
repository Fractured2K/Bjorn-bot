const ping = require('./ping');

commands = (message, command) => {
	const commands = {
		ping: () => ping(message)
	};

	if (commands[command]) {
		return commands[command]();
	}

	return;
};

module.exports = commands;
