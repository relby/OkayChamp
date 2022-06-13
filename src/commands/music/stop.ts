import { player } from "../.."
import { Command } from "../../classes/Command";

// TODO: Add option to select multiple tracks
export default new Command({
  type: "CHAT_INPUT",
  name: "stop",
  description: "stop",
  run: async ({ interaction }) => {
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) return await interaction.followUp("No music is being played!");
    queue.destroy();
    return await interaction.followUp("Stopped the player!");
  },
});
