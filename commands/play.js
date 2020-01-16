const ytdl = require("ytdl-core-discord");
const parseMessage = require("../utils/parseMessage");

play = async message => {
  const server = message.client.queue;
  const voiceChannel = message.member.voiceChannel;
  const url = parseMessage(message);

  if (!voiceChannel) {
    return message.channel.send("Please join a voice channel first");
  }

  if (!url) {
    return message.channel.send("Please provide a url or text to play a song");
  }

  // join voice channel and establish a connection
  const connection = await message.member.voiceChannel.join();

  // check to see if server connection exists
  if (!server.get(message.guild.id)) {
    server.set(message.guild.id, {
      textChannel: message.channel,
      voiceChannel,
      connection,
      songs: [],
      playing: false
    });
  }

  // add song to queue
  server.get(message.guild.id).songs.push(url);

  if (server.get(message.guild.id).playing) {
    return message.channel.send("Song added to queue");
  }

  // play song
  _playSong(message, server);
};

async function _playSong(message, server) {
  const queue = server.get(message.guild.id);

  // set queue to playing
  queue.playing = true;

  // stream song
  const dispatcher = await queue.connection.playOpusStream(
    await ytdl(queue.songs[0])
  );

  // the song has finished
  dispatcher.on("end", () => {
    // remove song from queue
    queue.songs.shift();

    // play next song
    if (queue.songs.length > 0) {
      return _playSong(message, server);
    }

    // remove server connection
    server.delete(message.guild.id);

    // leave voice channel
    message.member.voiceChannel.leave();
  });

  // catch any errors that may arise
  dispatcher.on("error", e => {
    console.log(e);
  });
}

module.exports = play;
