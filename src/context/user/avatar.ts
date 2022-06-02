import { Command } from "../../classes/Command";

export default new Command({
  type: "USER",
  name: "Get Avatar",
  run: async ({ client, interaction }) => {
    const user = await client.users.fetch(interaction.targetId);
    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });
    return interaction.followUp(avatar);
  }
})