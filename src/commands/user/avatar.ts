import {
  AllowedImageSize,
  ApplicationCommandOptionChoiceData,
  MessageEmbed,
  User,
} from "discord.js";
import { Command } from "../../classes/Command";

const SIZE_CHOICES: ApplicationCommandOptionChoiceData[] = [
  { name: "16", value: 16 },
  { name: "32", value: 32 },
  { name: "56", value: 56 },
  { name: "64", value: 64 },
  { name: "96", value: 96 },
  { name: "128", value: 128 },
  { name: "256", value: 256 },
  { name: "300", value: 300 },
  { name: "512", value: 512 },
  { name: "600", value: 600 },
  { name: "1024", value: 1024 },
  { name: "2048", value: 2048 },
  { name: "4096", value: 4096 },
];

export default new Command({
  type: "CHAT_INPUT",
  name: "avatar",
  description: "Displays your avatar or someone else's avatar",
  options: [
    {
      name: "user",
      description: "The user to get avatar for",
      type: "USER",
      required: false,
    },
    {
      name: "size",
      description: "Choose a size of an image",
      type: "INTEGER",
      required: false,
      choices: SIZE_CHOICES,
    },
  ],
  run: ({ interaction, args }) => {
    const user = (args.getUser("user") ?? interaction.user) as User;
    const size = (args.getInteger("size") ?? 1024) as AllowedImageSize;
    const avatar = user.displayAvatarURL({ dynamic: true, size });
    return interaction.followUp(avatar);
  },
});
