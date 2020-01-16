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

  const queueMessage = await message.channel.send(":arrows_counterclockwise: Preparing video")

  const songInfo = await ytdl.getInfo(url);
  const songThumbnails = songInfo.player_response.videoDetails.thumbnail.thumbnails;

  const song = {
	uploader: songInfo.author.name,
	uploader_url:`https://www.youtube.com/channel/${songInfo.author.id}`,
    thumbnail: songThumbnails[songThumbnails.length - 1].url,
    title: songInfo.title,
    video_url: songInfo.video_url,
    length: songInfo.length_seconds,
    addedBy: message.author.toString()
  };

  // add song to queue
  server.get(message.guild.id).songs.push(song);

  queueMessage.edit({
    embed: {
      color: 3066993,
        description: `${message2.author.toString()} added **[${songInfo.title}](${songInfo.video_url})** to the queue`,
    }
  });

  // check if song is currently playing
  if (server.get(message.guild.id).playing) {
    return;
  }

  // play song
  _playSong(message, server);
};

async function _playSong(message, server) {
  const queue = server.get(message.guild.id);
  const song = queue.songs[0];

  message.channel.send({
    embed: {
      color: 3447003,
      thumbnail: {
        url: song.thumbnail
      },
      fields: [
        {
          name: "Title",
          value: `**[${song.title}](${song.video_url})**`
        },
        {
          name: "Uploader",
          value: `**[${song.uploader}](${song.uploader_url})**`,
          inline: true
        },
        {
          name: "Added by",
          value: song.addedBy,
          inline: true
        },
        {
          name: "Length",
          value: `${toTimeString(song.length)}`,
          inline: true
        }
      ]
    }
  });

  // set queue to playing
  queue.playing = true;

  // stream song
  const dispatcher = await queue.connection.playOpusStream(await ytdl(song.video_url));

  // the song has finished
  dispatcher.on("end", () => {
    // remove song from queue
    queue.songs.shift();

    // play next song
    if (queue.songs.length > 0 && queue.playing === true) {
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

function toTimeString(seconds) {
  return new Date(seconds * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
}

module.exports = play;
