import { DiscordGatewayAdapterCreator, joinVoiceChannel } from "@discordjs/voice";
import { Command } from "../../classes/Command";

export default new Command({
  name: "connect",
  description: "Bot will connect to voice channel that you are in",
  run: ({ interaction }) => {
    const { channel } = interaction.member.voice;
    if (!channel) {
      interaction.followUp("You must be in the voice channel to use that command")
      return;
    }
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator as DiscordGatewayAdapterCreator,
      selfDeaf: false
    });
    interaction.followUp(`Connected to ${channel.name}`)
  }
});
