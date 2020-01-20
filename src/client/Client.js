const { Client } = require("discord.js");

module.exports = class extends Client {
  constructor() {
    super();
    this.commands = new Map();
    this.queue = new Map();
  }
};
