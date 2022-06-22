import { Command } from "../../classes/Command";

export default new Command({
  type: "CHAT_INPUT",
  name: "test",
  description: "test",
  run: ({ client, interaction }) => {
    client.guilds.cache.forEach(async (guild) => {
      if (guild.id === "702799408466624586") {
        const channel = await guild.channels.fetch("702799409238376472");
        console.log(channel);
      }
    });
    return interaction.followUp("Something went wrong");
  }
})