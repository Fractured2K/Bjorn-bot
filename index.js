require('dotenv').config();

// Modules
const Discord = require('discord.js');

// Utils
const parseCommand = require('./utils/parseCommand');

// Create discord client instance
const client = new Discord.Client();
client.login(process.env.DISCORD_CLIENT_SECRET);

// Listen for message event
client.on('message', message => {
	parseCommand(message);
});
