/*@
 * Returns the contents of a message minus the command. i.e "!8ball Is space neat?" -> "Is space neat?"
 * @param Object {message}
 */
parseMessage = message => {
  return message.content
    .split(" ")
    .slice(process.env.COMMAND_PREFIX.length)
    .join(" ");
};

module.exports = parseMessage;
