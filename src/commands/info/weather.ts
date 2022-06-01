import { Command } from "../../classes/Command";
import axios, { AxiosError } from "axios";
import { convertUnits, Units } from "../../utils/weather";

export default new Command({
  type: "CHAT_INPUT",
  name: "weather",
  description: "Shows the weather of the specific city",
  options: [
    {
      name: "city",
      description: "city that you want to find",
      type: "STRING",
      required: true,
    },
    {
      name: "units",
      description: "units",
      type: "STRING",
      choices: [
        {
          name: "celcius",
          value: "metric",
        },
        {
          name: "fahrenheit",
          value: "imperial",
        },
      ],
      required: false,
    }
  ],
  run: async ({ interaction, args }) => {
    const city = args.getString("city", true);
    const units = (args.getString("units") ?? "metric") as Units;

    const { WEATHER_API_URL, WEATHER_API_TOKEN } = process.env;
    const params = { "q": city, "units": units, "appid": WEATHER_API_TOKEN }
    try {
      const response = await axios.get(WEATHER_API_URL!, { params });
      const body = response.data;
      const city = body.name;
      const temp = (body.main.temp > 0 ? '+' : '') + body.main.temp + convertUnits(units);
      return interaction.followUp(`${city}: ${temp}`);
    } catch (e) {
      if (e instanceof AxiosError) {
        return interaction.followUp(`Could not find \`${city}\``);
      }
      console.error(e);
      return interaction.followUp(`Something went wrong`);
    }
  }
});