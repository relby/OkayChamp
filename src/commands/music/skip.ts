import { QueryType } from "discord-player";
import { player } from "../..";
import { Command } from "../../classes/Command";

// TODO: Add option to select multiple tracks
export default new Command({
  name: "skip",
  description: "skip",
  run: async ({ interaction }) => {
    const queue = player.getQueue(interaction.member.guild);
    if (!queue || !queue.playing) return interaction.followUp("**No music is being played!**");
    const currentTrack = queue.current;
    const ok = queue.skip();
    return interaction.followUp(ok ? `Skipped **${currentTrack.title}**!` : `Something went wrong!`);
  }
});
