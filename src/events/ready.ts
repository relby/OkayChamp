import { Event } from "../classes/Event";

export default new Event("ready", () => {
  console.log("Bot is online");
});
