import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js";
import { CommandType } from "../typings/command";
import glob from "glob";
import { promisify } from "util";
import { RegisterCommandsOptions } from "../typings/client";
import { Event } from "./Event";
import path from "path";

const globPromise = promisify(glob);

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection();
  constructor() {
    super({ intents: 32767 });
  }

  start() {
    this.registerModules();
    this.login(process.env.BOT_TOKEN);
  }
  async importFile(filePath: string) {
    return (await import(filePath))?.default;
  }

  async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
    if (guildId) {
      this.guilds.cache.get(guildId)?.commands.set(commands);
      console.log(`Registering commands to ${guildId}`);
    } else {
      this.application?.commands.set(commands);
      console.log("Registering global commands");
    }
  }

  async registerModules() {
    // Commands
    const slashCommands: ApplicationCommandDataResolvable[] = [];
    const commandFiles = await globPromise(
      `${__dirname}/../commands/*/*{.ts,.js}`
    );
    console.log("Commands:");
    commandFiles.forEach(async (filePath) => {
      const command: CommandType = await this.importFile(filePath);
      if (!command.name) return;
      console.log(`  ${path.basename(path.dirname(filePath))}: /${command.name}`);
      this.commands.set(command.name, command);
      slashCommands.push(command);
    });
    // User Context
    const userContextFiles = await globPromise(
      `${__dirname}/../context/user/*{.ts,.js}`
    );
    console.log("User context commands:");
    userContextFiles.forEach(async (filePath) => {
      const userContext: CommandType = await this.importFile(filePath);
      if (!userContext.name) return;
      console.log(`  ${userContext.name}`);
      this.commands.set(userContext.name, userContext);
      slashCommands.push(userContext);
    });
    // Message Context
    const messageContextFiles = await globPromise(
      `${__dirname}/../context/message/*{.ts,.js}`
    );
    console.log("Message context commands:");
    messageContextFiles.forEach(async (filePath) => {
      const messageContext: CommandType = await this.importFile(filePath);
      if (!messageContext.name) return;
      console.log(`  ${messageContext.name}`);
      this.commands.set(messageContext.name, messageContext);
      slashCommands.push(messageContext);
    });
    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        guildId: process.env.GUILD_ID,
      });
    });

    // Event
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
    eventFiles.forEach(async (filePath) => {
      const event: Event<keyof ClientEvents> = await this.importFile(filePath);
      this.on(event.event, event.run);
    });
  }
}
