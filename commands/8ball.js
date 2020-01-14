const reponses = require("../helpers/8ballReponses");
const parseMessage = require("../utils/parseMessage");

/*
 * Returns random 8ball response
 */

eightBall = message => {
  console.log(message);
  // generate random number between 1-20
  const guess = Math.floor(Math.random() * Math.floor(20) + 1);

  // return reponse from eight ball reponses array
  return message.channel.send({
    embed: {
      color: 3447003,
      title: `${message.author.username} asked 8 ball, ${parseMessage(
        message
      )}?`,
      description: reponses[guess]
    }
  });
};

module.exports = eightBall;
