import { Command } from "../../classes/Command";

export default new Command({
  type: "CHAT_INPUT",
  name: "test",
  description: "test",
  run: ({ client, interaction }) => {
    client.guilds.cache.forEach(console.log);
    return interaction.followUp("Something went wrong");
  }
})