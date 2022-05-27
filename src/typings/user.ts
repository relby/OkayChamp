import { Message, BaseGuildTextChannel, User } from "discord.js";

export interface UserWithMessagesInChannel extends User {
  channel: BaseGuildTextChannel;
  messages: Message[];
};