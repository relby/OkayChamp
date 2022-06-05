import { QueryType } from "discord-player";
import { player } from "../..";
import { Command } from "../../classes/Command";
import { isURL } from "../../utils/music";

export default new Command({
  type: "CHAT_INPUT",
  name: "play",
  description: "Plays the fucking music",
  options: [
    {
      name: "song",
      description: "Song to search for or the YT link of the song",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ interaction, args }) => {
    const { channel } = interaction.member.voice;
    if (!channel) {
      return interaction.followUp("You must join a voice channel to use that!");
    }

    const queue = player.createQueue(channel.guild, {
      metadata: { channel }
    });
    try {
      if (!queue.connection) await queue.connect(channel);
    } catch {
      queue.destroy();
      return await interaction.followUp({
        content: "Could not join your voice channel",
        ephemeral: true
      });
    }
    console.log(queue);
    let query = args.getString("song", true);
    const result = isURL(query)
      ? await player.search(query, {
          requestedBy: interaction.member,
          searchEngine: QueryType.YOUTUBE_VIDEO,
        })
      : await player.search(query, {
          requestedBy: interaction.member,
          searchEngine: QueryType.YOUTUBE_SEARCH,
        });

    if (!result.tracks.length) {
      return interaction.followUp("**Not found.**");
    }

    const song = result.tracks[0];
    queue.addTrack(song);

    if (!queue.playing) await queue.play();
    return interaction.followUp(
      `**${song.title}** Added to queue (\`${song.duration}\`)!`
    );
  },
});
