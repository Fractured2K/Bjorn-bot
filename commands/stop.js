stop = message => {
  if (!message.member.voiceChannel) {
    return message.channel.send("Please join a voice channel first");
  }

  const server = message.client.queue.get(message.guild.id);

  if (!server) {
    return message.channel.send("No songs currently playing.");
  }

  server.playing = false;

  // end song
  server.connection.dispatcher.end();

  // leave voice channel
  message.member.voiceChannel.leave();

  // remove server
  message.client.queue.delete(message.guild.id);

  return message.channel.send({
    embed: {
      color: 15158332,
      description: `:stop_button: ${message.author.toString()} Stopped the player and cleared queue`
    }
  });
};

module.exports = stop;
