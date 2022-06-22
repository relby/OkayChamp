import { TextChannel } from "discord.js";
import { Command } from "../../classes/Command";

export default new Command({
  type: "CHAT_INPUT",
  name: "test",
  description: "test",
  run: ({ client, interaction }) => {
    client.guilds.cache.forEach(async (guild) => {
      if (guild.id === "702799408466624586") {
        const channel = await guild.channels.fetch("702799409238376472") as TextChannel;
        await channel.send("https://stock-images.0o.si/?p#/old-man-tries-to-climb-ladder-falls-down-and-eats-cookie-2298498123%5C");
        (await channel.messages.fetch({ limit:10 })).forEach(message => console.log(message.content));
      }
    });
    return interaction.followUp("Something went wrong");
  }
})