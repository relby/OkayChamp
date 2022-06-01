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

    const map: Collection<Snowflake, UserWithMessagesInChannel> = new Collection();
    let msg_ptr = await channel.messages
      .fetch({ limit: 1 })
      .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

    while (msg_ptr) {
      await channel.messages
        .fetch({ limit: 100, before: msg_ptr.id })
        .then(messagePage => {

          messagePage.forEach(msg => {
            const regex = new RegExp("(\\P{L}|^)" + `(${word})` + "(\\P{L}|$)", "ium");
            if (msg.content.match(regex) == null) return;

            const id = msg.author.id;
            const user_with_msgs = map.has(id) ? map.get(id)! : Object.assign({ messages: <Message[]>[], channel: channel }, msg.author);

            user_with_msgs.messages.push(msg);
            map.set(id, Object.assign(user_with_msgs, msg.author));
          });
          // Update our message pointer to be last message in page of messages
          msg_ptr = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
        });
    }
    const out: string[] = [];
    // TODO: Sort the output
    map.forEach(({ username, discriminator, messages }) => {
      out.push(`${username}#${discriminator} ${messages.length}`);
    });
    return interaction.followUp(`<#${channel.id}>: \n` + (out.length ? out.join("\n") : "No messages in this channel found"));
  }
});
