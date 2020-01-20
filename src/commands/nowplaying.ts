import { Message } from "discord.js";

export default function nowplaying(message: Message) {
  const server = (message.client as any).queue.get(message.guild.id);

  if (!server || !server.playing) {
    return message.channel.send("No songs currently playing.");
  }

  const currentSong = server.songs[0];

  return message.channel.send({
    embed: {
      color: 15105570,
      description: `${message.author.toString()} **[${currentSong.title}](${
        currentSong.video_url
      })** is currently playing`
    }
  });
}
