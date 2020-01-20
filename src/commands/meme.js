const { Attachment } = require("discord.js");
const axios = require("axios");

/*
 * Returns random meme from meme api
 */

meme = async message => {
  // send message confirming a meme is being sent
  message.channel.send({
    embed: {
      color: 3447003,
      title: "Scrait up stealing a meme, 1sec."
    }
  });

  // fetch meme from api
  const { data } = await axios.get("https://meme-api.herokuapp.com/gimme");

  // create message message attachment
  const attachment = new Attachment(data.url);

  // return message with attached meme (image)
  return message.channel.send(attachment);
};

module.exports = meme;
