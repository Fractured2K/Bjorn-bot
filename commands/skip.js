skip = message => {
  if (!message.member.voiceChannel) {
    return message.channel.send("Please join a voice channel first");
  }

  const server = message.client.queue.get(message.guild.id);

  if (!server) {
    return message.channel.send("No songs currently playing.");
  }

  message.channel.send({
    embed: {
      color: 15105570,
      description: `:track_next: Skipped [${server.songs[0].title}](${server.songs[0].video_url})`
    }
  });

  // end song
  server.connection.dispatcher.end();
};

module.exports = skip;
