require('dotenv').config();
const Discord = require('discord.js');
const parseMessage = require('./utils/parseMessage');

// Create discord client instance
const client = new Discord.Client();

// Login into discord cline
client.login(process.env.DISCORD_CLIENT_SECRET);

// Listen for message event
client.on('message', message => {
	// Parse message
	parseMessage(message);
});
