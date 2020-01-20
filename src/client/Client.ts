import { Client as DiscordClient } from "discord.js";

export class Client extends DiscordClient {
  constructor() {
    super();
    (this as any).commands = new Map();
    (this as any).queue = new Map();
  }
}
