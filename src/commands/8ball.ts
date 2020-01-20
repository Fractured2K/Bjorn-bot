import reponses from "../helpers/8ballReponses";
import { parseMessage } from "../utils/parseMessage";
import { Message } from "discord.js";

/*
 * Returns random 8ball response
 */

export const eightBall = (message: Message) => {
  // generate random number between 1-20
  const guess = Math.floor(Math.random() * Math.floor(20) + 1);

  // parse message
  const parsedMessage = parseMessage(message);

  if (!parsedMessage)
    return message.channel.send(
      "Please provide a question to the eight ball :<"
    );

  // return reponse from eight ball reponses array
  return message.channel.send({
    embed: {
      color: 3447003,
      title: `${message.author.username} asked 8 ball, ${parsedMessage}?`,
      description: reponses[guess]
    }
  });
};
