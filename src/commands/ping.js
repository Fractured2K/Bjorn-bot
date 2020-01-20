/*
 * Sends "pong" to channel
 */

const ping = message => {
	return message.channel.send('Pong!');
};

module.exports = ping;
