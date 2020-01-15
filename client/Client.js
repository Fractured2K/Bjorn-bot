const { Client } = require("discord.js");

module.exports = class extends Client {
  constructor() {
    super();
    this.queue = new Map();
  }
};
