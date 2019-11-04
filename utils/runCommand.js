const eightBall = require('../commands/8ball');
const meme = require('../commands/meme');
const ping = require('../commands/ping');

runCommand = (message, command) => {
	// available commands
	const commands = {
		'8ball': () => eightBall(message),
		meme: () => meme(message),
		ping: () => ping(message)
	};

	// check if command exists
	if (commands[command]) {
		// run command
		return commands[command]();
	}
};

module.exports = runCommand;
