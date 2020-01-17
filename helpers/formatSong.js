const ytdl = require("ytdl-core-discord");

/*@
 * Accepts a youtube url and returns a formatted song object
 * @param {String} url
 * @param {Object} message
 * @return {Object}
 */

formatSong = async (url, message) => {
  // query youtube video meta data
  const songInfo = await ytdl.getInfo(url);

  // select largest thumbnail from thumbnails array
  const songThumbnails =
    songInfo.player_response.videoDetails.thumbnail.thumbnails;

  return {
    uploader: songInfo.author.name,
    uploader_url: `https://www.youtube.com/channel/${songInfo.author.id}`,
    thumbnail: songThumbnails[songThumbnails.length - 1].url,
    title: songInfo.title,
    video_url: songInfo.video_url,
    length: songInfo.length_seconds,
    addedBy: message.author.toString()
  };
};

module.exports = formatSong;
