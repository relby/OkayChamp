import { QueryType } from "discord-player";
import { player } from "../..";
import { Command } from "../../classes/Command";

export default new Command({
  name: "play",
  description: "Plays the fucking music",
  options: [
    {
      name: "url",
      description: "URL of the song on youtube",
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

    let url = interaction.options.getString("url", true);

    const result = await player.search(url, {
      requestedBy: interaction.member,
      searchEngine: QueryType.YOUTUBE_VIDEO
    });

    if (!result.tracks.length) {
      return interaction.followUp("**Not found.**");
    }

    const song = result.tracks[0];
    await queue.addTrack(song);

    if (!queue.playing) await queue.play();
    return interaction.followUp(`**${song.title}** Added to queue (\`${song.duration}\`)!`);
  }
});
