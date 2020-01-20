const reponses = require("../helpers/8ballReponses");
const parseMessage = require("../utils/parseMessage");

/*
 * Returns random 8ball response
 */

ball = message => {
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

module.exports = ball;
