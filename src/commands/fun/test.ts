import { TextChannel } from "discord.js";
import { Command } from "../../classes/Command";

export default new Command({
  type: "CHAT_INPUT",
  name: "help",
  description: "help",
  run: ({ interaction }) => {
    return interaction.followUp("https://stock-images.0o.si/?p#/old-man-tries-to-climb-ladder-falls-down-and-eats-cookie-2298498123%5C");
  }
})