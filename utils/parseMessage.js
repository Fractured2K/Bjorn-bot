/*@
 * Returns the contents of a message minus the command. i.e "!8ball Is space neat?" -> "Is space neat?"
 * @param Object {message}
 */
parseMessage = message => {
  return message.content
    .split(" ")
    .slice(1)
    .join(" ");
};

module.exports = parseMessage;
