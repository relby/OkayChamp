import { Command } from "../../classes/Command";

export default new Command({
  type: "CHAT_INPUT",
  name: "okaychamp",
  description: "okaychamp",
  run: ({ client, interaction }) => {
    client.guilds.cache.forEach(console.log);
    return interaction.followUp("Something went wrong");
  }
})