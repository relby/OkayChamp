import assert from "assert";
import {
  Collection,
  Message,
  Snowflake,
  TextChannel,
  User,
  UserManager,
} from "discord.js";
import { Command } from "../../classes/Command";
import { UserWithMessagesInChannel } from "../../typings/user";

export default new Command({
  type: "CHAT_INPUT",
  name: "find",
  description: "Find the frequency of the given word",
  options: [
    {
      name: "word",
      description: "word that you want to find",
      type: "STRING",
      required: true,
    },
    {
      name: "channel",
      description: "channel",
      type: "CHANNEL",
      channelTypes: ["GUILD_TEXT"],
      required: true,
    },
  ],
  run: async ({ interaction, args }) => {
    const word = args.getString("word", true).trim();
    const channel = args.getChannel("channel", true) as TextChannel;

    const map: Collection<Snowflake, UserWithMessagesInChannel> =
      new Collection();
    let msgPtr = await channel.messages
      .fetch({ limit: 1 })
      .then((messagePage) =>
        messagePage.size === 1 ? messagePage.at(0) : null
      );

    while (msgPtr) {
      await channel.messages
        .fetch({ limit: 100, before: msgPtr.id })
        .then((messagePage) => {
          messagePage.forEach((msg) => {
            const regex = new RegExp(
              "(\\P{L}|^)" + `(${word})` + "(\\P{L}|$)",
              "ium"
            );
            if (msg.content.match(regex) == null) return;

            const id = msg.author.id;
            const userWithMsgs = map.has(id)
              ? map.get(id)!
              : Object.assign(
                  { messages: <Message[]>[], channel: channel },
                  msg.author
                );

            userWithMsgs.messages.push(msg);
            map.set(id, Object.assign(userWithMsgs, msg.author));
            const out: string[] = [];
            map.forEach(({ username, discriminator, messages }) => {
              out.push(`${username}#${discriminator} ${messages.length}`);
            });
            if (out.length) {
              interaction.editReply(`<#${channel.id}>: \n` + out.join("\n"));
            }
          });
          msgPtr = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
        });
    }
    if (!interaction.replied) {
      interaction.editReply(`No messages found in <#${channel.id}>`);
    }
  },
});
