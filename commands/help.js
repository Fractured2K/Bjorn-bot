/*
 * Returns embeded message of possible commands
 */

help = message => {
  // return reponse from eight ball reponses array
  return message.channel.send({
    embed: {
      color: 3447003,
      title: "Possible commands",
      description: "A list of some cool shit Bjorn can do",
      fields: [
		{
			name: "```!play```",
			value: "**COMING SOON**"
		},
        {
          name: "```!8ball```",
		  value: "**Ask the eight ball a question and get a response!**",
        },
        {
          name: "```!Meme```",
          value: "**Scrait up steals a meme**"
        },
        {
          name: "```!Ping```",
          value:
            "**Replies with pong**"
        }
      ]
    }
  });
};

module.exports = help;
