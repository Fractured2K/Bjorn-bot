import { Message } from "discord.js";

/*
 * Sends "pong" to channel
 */

export default function ping(message: Message) {
  return message.channel.send("Pong!");
}
