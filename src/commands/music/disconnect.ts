import { getVoiceConnection } from "@discordjs/voice";
import { Command } from "../../classes/Command";

export default new Command({
  name: "disconnect",
  description: "Bot will disconnect from the voice channel",
  run: ({ interaction }) => {
    const connection = getVoiceConnection(interaction.member.guild.id);
    if (!connection) {
      interaction.followUp("Bot isn't connected to any channel");
      return;
    }
    connection.destroy();
    interaction.followUp("Disconnected");
  }
});
