require("dotenv").config();
import { Client } from "./client/Client";
import { Message } from "discord.js";
import { executeCommand } from "./utils/executeCommand";

const client = new Client();

client.login(process.env.DISCORD_CLIENT_SECRET);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(process.env.BOT_STATUS as string);
});

client.on("message", (message: Message) => {
  try {
    // ignore bot messages
    if (message.author.bot) return;
    // ignore messages without command prefix
    if (!message.content.startsWith(process.env.COMMAND_PREFIX as string))
      return;

    executeCommand(message);
  } catch (error) {
    message.channel.send("Sorry, but something went wrong.");
    throw new Error(error);
  }
});
