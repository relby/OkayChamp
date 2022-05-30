import { QueryType } from "discord-player";
import { player } from "../..";
import { Command } from "../../classes/Command";
import { isURL } from "../../utils/music";

export default new Command({
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
  run: async ({ interaction }) => {
    const { channel } = interaction.member.voice;
    if (!channel) {
      return interaction.followUp("You must join a voice channel to use that!");
    }

    const queue = await player.createQueue(channel.guild);

    if (!queue.connection) await queue.connect(channel);

    let query = interaction.options.getString("song", true);
    const result = isURL(query)
      ? await player.search(query, {
        requestedBy: interaction.member,
        searchEngine: QueryType.YOUTUBE_VIDEO
      })
      : await player.search(query, {
        requestedBy: interaction.member,
        searchEngine: QueryType.YOUTUBE_SEARCH
      })

    if (!result.tracks.length) {
      return interaction.followUp("**Not found.**");
    }

    const song = result.tracks[0];
    queue.addTrack(song);

    if (!queue.playing) await queue.play();
    return interaction.followUp(`**${song.title}** Added to queue (\`${song.duration}\`)!`);
  }
});
