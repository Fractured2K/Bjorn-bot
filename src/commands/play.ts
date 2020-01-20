import ytdl from "ytdl-core-discord";
import { formatSong } from "../helpers/formatSong";
import { generateUrl } from "../helpers/generateUrl";
import { Message } from "discord.js";

// @ts-ignore
export default async function play(message: Message) {
  try {
    const server = (message.client as any).queue;
    const voiceChannel = message.member.voiceChannel;

    if (!voiceChannel) {
      return message.channel.send("Please join a voice channel first");
    }

    // join voice channel and establish a connection
    const connection = await message.member.voiceChannel.join();

    // check server existence
    if (!server.get(message.guild.id)) {
      server.set(message.guild.id, {
        textChannel: message.channel,
        voiceChannel,
        connection,
        songs: [],
        playing: false
      });
    }

    // send video preparation confirmation
    const queueMessage = await message.channel.send(
      ":arrows_counterclockwise: Preparing song"
    );

    // prepare video url
    const url = await generateUrl(message);
    // query and format video meta data
    const song = await formatSong(url, message);

    // add song to server queue
    server.get(message.guild.id).songs.push(song);

    // replace queueMessage with song added to queue confirmation message
    (queueMessage as Message).edit({
      embed: {
        color: 3066993,
        description: `${message.author.toString()} added **[${song.title}](${
          song.video_url
        })** to the queue`
      }
    });

    // check if song is currently playing
    if (server.get(message.guild.id).playing) {
      return;
    }

    // play song
    _playSong(message, server);
  } catch (error) {
    throw new Error(error);
  }
}

async function _playSong(message: Message, server: Map<string, Object>) {
  const queue = server.get(message.guild.id);
  const song = (queue as any).songs[0];

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
          value: `${_toTimeString(song.length)}`,
          inline: true
        }
      ]
    }
  });

  // set queue to playing
  (queue as any).playing = true;

  // stream song
  const dispatcher = await (queue as any).connection.playOpusStream(
    await ytdl(song.video_url)
  );

  // set clients status to current song playing
  message.client.user.setActivity(`${song.title}`);

  // the song has finished
  // @ts-ignore
  dispatcher.on("end", () => {
    // remove song from queue
    (queue as any).songs.shift();

    // play next song
    if ((queue as any).songs.length > 0 && (queue as any).playing === true) {
      return _playSong(message, server);
    }

    // remove server connection
    server.delete(message.guild.id);

    // leave voice channel
    message.member.voiceChannel.leave();

    // reset clients status to env status
    message.client.user.setActivity(process.env.BOT_STATUS as any);
  });

  // catch any errors that may arise
  dispatcher.on("error", (error: Error) => {
    console.log(error);
  });
}

function _toTimeString(seconds: Number) {
  // @ts-ignore
  return new Date(seconds * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
}
