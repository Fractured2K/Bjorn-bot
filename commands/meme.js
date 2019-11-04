const { Attachment } = require('discord.js');
const axios = require('axios');

meme = async message => {
	// fetch meme from api
	const { data } = await axios.get('https://meme-api.herokuapp.com/gimme');

	// create message message attachment
	const attachment = new Attachment(data.url);

	// return message with attached meme (image)
	return message.channel.send(attachment);
};

module.exports = meme;
