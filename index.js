require("dotenv").config();
const Discord = require("discord.js");
const parseCommand = require("./utils/parseCommand");

// Create discord client instance
const client = new Discord.Client();

// Login into discord cline
client.login(process.env.DISCORD_CLIENT_SECRET);

// Confirm sucessful login
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Set status of bot on successful connection
client.on("ready", () => {
  client.user.setStatus(process.env.BOT_STATUS);
});

// Listen for message event
client.on("message", message => {
  try {
    // Parse message
    parseCommand(message, client);
  } catch (error) {
    throw new Error(error);
  }
});
