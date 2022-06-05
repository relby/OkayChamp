import { Command } from "../../classes/Command";
import { player } from "../..";

export default new Command({
  type: "CHAT_INPUT",
  name: "join",
  description: "join",
  run: async ({ interaction }) => {
    const { channel } = interaction.member.voice;
    if (!channel) {
      return interaction.followUp("You must join a voice channel to use that!");
    }
    const queue = player.createQueue(channel.guild);
    if (!queue.connection) queue.connect(channel);
    return interaction.followUp(`Connected to <#${channel.id}>`);
  }
})