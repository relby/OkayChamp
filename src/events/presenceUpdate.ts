import { Activity, CommandInteractionOptionResolver, GuildManager, GuildMember } from "discord.js";
import { client } from "..";
import { Event } from "../classes/Event";
import { ExtendedInteraction } from "../typings/Command";

export default new Event("presenceUpdate", async (oldPresence, newPresence) => {
  if (newPresence.activities.find(({ name }) => name === "League of Legends")) {
    newPresence.member?.ban({reason: "Вы пидорас"});
  }
});
