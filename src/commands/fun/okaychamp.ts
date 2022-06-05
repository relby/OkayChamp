import { Command } from "../../classes/Command";

const OKAYCHAMP_IMAGE_URL = "https://cdn.discordapp.com/avatars/772779258887274518/8691af95ade2f902413b6da1c777e837.webp?size=1024"

export default new Command({
  type: "CHAT_INPUT",
  name: "okaychamp",
  description: "okaychamp",
  run: ({ client, interaction }) => {
    return interaction.followUp({ embeds: [
      {
        color: "AQUA",
        title: "OkayChamp",
        url: OKAYCHAMP_IMAGE_URL,
        author: {
          name: "OkayChamp",
          iconURL: OKAYCHAMP_IMAGE_URL,
          url: OKAYCHAMP_IMAGE_URL
        },
        description: `[OkayChamp](${OKAYCHAMP_IMAGE_URL})`,
        thumbnail: {
          url: OKAYCHAMP_IMAGE_URL
        },
        image: {
          url: OKAYCHAMP_IMAGE_URL
        },
        footer: {
          text: "OkayChamp",
          iconURL: OKAYCHAMP_IMAGE_URL
        },
      }
    ] })
  }
})