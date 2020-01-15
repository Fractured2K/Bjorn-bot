const ytdl = require("ytdl-core-discord");
const parseMessage = require("../utils/parseMessage");

play = async message => {
  const queue = message.client.queue;
  const voiceChannel = message.member.voiceChannel;

  if (!voiceChannel) {
    return message.channel.send("Please join a voice channel first");
  }

  // join voice channel and establish a connection
  const connection = await message.member.voiceChannel.join();

  // check to see if server queue exists
  if (!queue.get(message.guild.id)) {
    queue.set(message.guild.id, {
      textChannel: message.channel,
      voiceChannel,
      connection,
      songs: [],
      playing: false
    });
  }

  // add song to queue
  queue.get(message.guild.id).songs.push(parseMessage(message));

  console.log(queue.get(message.guild.id).songs);
  if (queue.get(message.guild.id).playing) {
    return message.channel.send("Song added to queue");
  }

  // play song
  _playSong(message, queue);
};

async function _playSong(message, queue) {
  queue.get(message.guild.id).playing = true;

  // stream song
  const dispatcher = await queue
    .get(message.guild.id)
    .connection.playOpusStream(
      await ytdl(queue.get(message.guild.id).songs[0])
    );

  // the song has finished
  dispatcher.on("end", () => {
    // remove song from queue
    queue.get(message.guild.id).songs.shift();

    // play next song
    if (queue.get(message.guild.id).songs.length > 0) {
      return _playSong(message, queue);
    }

    // remove server from queue
    queue.delete(message.guild.id);

    // leave voice channel
    message.member.voiceChannel.leave();
  });

  // catch any errors that may arise
  dispatcher.on("error", e => {
    console.log(e);
  });
}

module.exports = play;
