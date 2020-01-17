const parseMessage = require("../utils/parseMessage");
const axios = require("axios");

generateUrl = async message => {
  const supportedUrls = ["http://www.youtube.com/watch?", "http://youtu.be/"];

  const urlOrText = parseMessage(message);

  if (supportedUrls.includes(urlOrText)) {
    return urlOrText;
  } else {
    const formattedUrl = _formatUrl(urlOrText);
    const { data } = await axios.get(formattedUrl);
    return `http://youtu.be/${data.items[0].id.videoId}`;
  }
};

function _formatUrl(text) {
  const formattedText = text.split(" ").join("%20");
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${formattedText}&maxResults=1&key=${process.env.YOUTUBE_KEY}`;
}

module.exports = generateUrl;
