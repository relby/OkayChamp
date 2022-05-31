import { Event } from "../classes/Event";

export default new Event("presenceUpdate", async (oldPresence, newPresence) => {
  if (newPresence.activities.find(({ name }) => name === "League of Legends")) {
    newPresence.member?.ban({reason: "Вы пидорас"});
  }
});
