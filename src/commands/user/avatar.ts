import { User } from "discord.js";
import { Command } from "../../classes/Command";

export default new Command({
  name: "avatar",
  description: "avatar",
  options: [
    {
      name: "user",
      description: "user",
      type: "USER",
      required: false,
    }
  ],
  run: ({ interaction }) => {
    const user = (interaction.options.getUser("user") ?? interaction.user) as User;
    const avatar = user.avatarURL() ?? `${user.username} doesn't have an avatar`;
    interaction.followUp(avatar);
  }
});