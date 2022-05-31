import axios, { AxiosError, AxiosResponse } from "axios";
import { TextChannel } from "discord.js";
import { Command } from "../../classes/Command";
import { ANIME_API_URL, fileName, NSFW_CHOICES, SFW_CHOICES } from "../../utils/anime";

export default new Command({
  name: "anime",
  description: "anime",
  options: [
    {
      name: "sfw",
      description: "Search for 'save for work' anime picture",
      type: "SUB_COMMAND",
      options: [
        {
          name: "type",
          description: "Choose type of picture",
          type: "STRING",
          required: true,
          choices: SFW_CHOICES
        }
      ]
    },
    {
      name: "nsfw",
      description: "Search for 'not save for work' anime picture",
      type: "SUB_COMMAND",
      options: [
        {
          name: "type",
          description: "Choose type of picture",
          type: "STRING",
          required: true,
          choices: NSFW_CHOICES
        }
      ]
    }
  ],
  run: async ({ interaction, args }) => {
    const type = args.getSubcommand(true) as "sfw" | "nsfw";
    const endpoint = args.getString('type', true);
    try {
      const { data } = await axios.get<any, AxiosResponse<ArrayBuffer>>(`${ANIME_API_URL}/${type}/${endpoint}`, {
        responseType: "arraybuffer"
      });
      const imageBuffer = Buffer.from(data);
      const isSpoiler = !(interaction.channel as TextChannel).nsfw && type === "nsfw";
      return interaction.followUp({files: [{name: fileName(endpoint, isSpoiler), attachment: imageBuffer}]});
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError && e.response.status >= 500) {
        return interaction.followUp("Something went wrong! Try again!");
      }
      return interaction.followUp("Uncaught error! Please notify the developer!");
    }
  }
});