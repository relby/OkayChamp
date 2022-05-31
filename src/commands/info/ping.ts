import { Command } from "../../classes/Command";

export default new Command({
  name: "ping",
  description: "Replies with pong",
  run: async ({ interaction }) => {
    const latency = new Date().getTime() - interaction.createdAt.getTime();
    interaction.followUp(`Pong! \`${latency}ms\``);
  }
});
