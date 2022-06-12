import { Command } from "../../classes/Command";

// TODO: Add option to select multiple tracks
export default new Command({
  type: "CHAT_INPUT",
  name: "stop",
  description: "stop",
  run: async ({ interaction }) => {
    return await interaction.followUp("test");
  },
});
