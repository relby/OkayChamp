import { MessageEmbed, User } from "discord.js";
import { Command } from "../../classes/Command";

export default new Command({
  name: "avatar",
  description: "Displays your avatar or someone else's avatar",
  options: [
    {
      name: "user",
      description: "The user to get avatar for",
      type: "USER",
      required: false,
    },
  ],
  run: ({ interaction }) => {
    const user = (interaction.options.getUser("user") ?? interaction.user) as User;
    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Avatar link")
      .setURL(avatar)
      .setAuthor({
        name: `${user.username}#${user.discriminator}`,
        iconURL: avatar,
      })
      .setImage(avatar)
      .setFooter({
        text: `Requested by ${interaction.user.username}#${interaction.user.discriminator}`,
        iconURL: interaction.user.displayAvatarURL(),
      });
    interaction.followUp({ embeds: [embed] });
  },
});
