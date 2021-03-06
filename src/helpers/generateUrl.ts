import { parseMessage } from "../utils/parseMessage";
import axios from "axios";
import { Message } from "discord.js";

/*@
 * Validates passed in URLs, if text is passed, parses text into youtube url
 * @param  {Object} message Discord message, used to get contents of message. In this case a url or text.
 * @return {String}         Returns youtube url
 */

export const generateUrl = async (message: Message) => {
  const supportedUrls = ["http://www.youtube.com/watch?", "http://youtu.be/"];
  const urlOrText = parseMessage(message);

  if (supportedUrls.includes(urlOrText)) {
    return urlOrText;
  } else {
    const url = _formatUrl(urlOrText);
    const { data } = await axios.get(url);
    const videoId = data.items[0].id.videoId;
    return `http://youtu.be/${videoId}`;
  }
};

function _formatUrl(text: string) {
  const formattedText = text.split(" ").join("%20");
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${formattedText}&maxResults=1&key=${process.env.YOUTUBE_KEY}`;
}
