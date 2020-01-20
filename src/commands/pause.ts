import { Message } from "discord.js";

export default function pause(message: Message) {
  if (!message.member.voiceChannel) {
    return message.channel.send("Please join a voice channel first");
  }

  const server = (message.client as any).queue.get(message.guild.id);

  if (!server) {
    return message.channel.send("No songs currently playing.");
  }

  if (server.playing) {
    server.playing = false;
    // pause song
    server.connection.dispatcher.pause();
  } else {
    server.playing = true;
    // resume song
    server.connection.dispatcher.resume();
  }

  return message.channel.send({
    embed: {
      color: 10181046,
      description: `:play_pause: [${server.songs[0].title}](${
        server.songs[0].video_url
      }) has been ${server.playing ? "**resumed**" : "**paused**"}`
    }
  });
}
