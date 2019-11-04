/*
 * Returns random 8ball response
 */

const reponses = require('../helpers/8ballReponses');

eightBall = message => {
	// generate random number between 1-20
	const guess = Math.floor(Math.random() * Math.floor(20) + 1);

	// return reponse from eight ball reponses array
	return message.channel.send(reponses[guess]);
};

module.exports = eightBall;
