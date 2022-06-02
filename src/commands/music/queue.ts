import { QueryType } from "discord-player";
import { player } from "../..";
import { Command } from "../../classes/Command";

const TRACKS_ON_PAGE = 10;
const EMBED_COLOR = 0xff0000;

export default new Command({
  type: "CHAT_INPUT",
  name: "queue",
  description: "queue",
  options: [
    {
      name: "page",
      description: "Specific page number in queue",
      type: "INTEGER",
      required: false,
    },
  ],
  run: async ({ interaction, args }) => {
    const queue = player.getQueue(interaction.member.guild);
    if (!queue || !queue.playing)
      return interaction.followUp("**No music is being played!**");
    const page = args.getInteger("page") ?? 1;
    const pageStart = TRACKS_ON_PAGE * (page - 1);
    const pageEnd = pageStart + TRACKS_ON_PAGE;
    const currentTrack = queue.current;

    const tracks = queue.tracks.slice(pageStart, pageEnd).map((track, i) => {
      return `[${i + pageStart + 1}] **${track.title}** ([link](${track.url}))`;
    });
    return interaction.followUp({
      embeds: [
        {
          title: "Server queue",
          description: `${tracks.join("\n")}${
            queue.tracks.length > pageEnd
              ? `\n...${queue.tracks.length - pageEnd} more track(s)`
              : ""
          }`,
          color: EMBED_COLOR,
          fields: [
            {
              name: "Now Playing",
              value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))`,
            },
          ],
        },
      ],
    });
  },
});
