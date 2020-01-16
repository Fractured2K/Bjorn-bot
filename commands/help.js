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
          name: "```!play {URL}```",
          value: "**Plays a song**"
        },
        {
          name: "```!pause```",
          value: "**Pause/Resume current song**"
        },
        {
          name: "```!skip```",
          value: "**Skip song currently playing**"
        },
        {
          name: "```!stop```",
          value: "**Stop song currently playing**"
        },
        {
          name: "```!queue - COMING SOON```",
          value: "**View current songs in queue**"
        },
        {
          name: "```!nowplaying - COMING SOON```",
          value: "**Returns current song playing**"
        },
        {
          name: "```!shuffle - COMING SOON```",
          value: "**Shuffles the current songs in queue**"
        },
        {
          name: "```!8ball```",
          value: "**Ask the eight ball a question and get a response!**"
        },
        {
          name: "```!meme```",
          value: "**Scrait up steals a meme**"
        },
        {
          name: "```!ping```",
          value: "**Replies with pong**"
        }
      ]
    }
  });
};

module.exports = help;
