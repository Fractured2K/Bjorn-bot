import { Message } from "discord.js";

/**
 * Returns the contents of a message minus the command. i.e "!8ball Is space neat?" -> "Is space neat?"
 * @param Object {message}
 */
export const parseMessage = (message: Message) => {
  return message.content
    .split(" ")
    .slice((process.env.COMMAND_PREFIX as any).length)
    .join(" ");
};
