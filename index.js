// Modules
const Discord = require('discord.js');

// Create discord client instance
const client = new Discord.Client();

client.on('message', message => {
	console.log(message);
});
