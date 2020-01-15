require("dotenv").config();
const Client = require('./client/Client');
const executeCommand = require("./utils/executeCommand");


const client = new Client();
client.login(process.env.DISCORD_CLIENT_SECRET);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(process.env.BOT_STATUS);
});

client.on("message", message => {
  try {
	if (message.author.bot) return;
	if (!message.content.startsWith(process.env.COMMADN_PREFIX)) return;
    executeCommand(message);
  } catch (error) {
    throw new Error(error);
  }
});
