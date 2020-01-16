stop = message => {
  if (!message.member.voiceChannel) {
    return message.channel.send("Please join a voice channel first");
  }

  const server = message.client.queue.get(message.guild.id);

  if (!server) {
    return message.channel.send("No songs currently playing.");
  }

  // end song
  server.connection.dispatcher.end();

  // remove server
  message.client.queue.delete(message.guild.id);

  // leave voice channel
  message.member.voiceChannel.leave();

  return message.channel.send({
    embed: {
      color: 3447003,
      title: `Song stopped and queue cleared`
    }
  });
};

module.exports = stop;
