import { Command } from "../../classes/Command";

export default new Command({
  type: "CHAT_INPUT",
  name: "ping",
  description: "Replies with pong",
  run: async ({ interaction }) => {
    const latency = new Date().getTime() - interaction.createdAt.getTime();
    return interaction.followUp(`Pong! \`${latency}ms\``);
  },
});
