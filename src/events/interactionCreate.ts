import { CommandInteractionOptionResolver, MessageContextMenuInteraction, UserContextMenuInteraction } from "discord.js";
import { client } from "..";
import { Event } from "../classes/Event";
import { ChatCommandType, CommandType, ExtendedChatCommandInteraction, MessageContextCommand, UserContextCommand } from "../typings/command";

export default new Event("interactionCreate", async (interaction) => {
    // Chat Input Commands
    if (interaction.isApplicationCommand()) {
        await interaction.deferReply();
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName) as ChatCommandType;
            if (!command) return interaction.followUp("You have used a non existent command");
            command.run({
                args: interaction.options as CommandInteractionOptionResolver,
                client,
                interaction: interaction as ExtendedChatCommandInteraction,
            });
            console.log(`${interaction.user.username}#${interaction.user.discriminator} used /${command.name} on ${interaction.guild}`);
        } else if (interaction.isUserContextMenu()) {
            const command = client.commands.get(interaction.commandName) as UserContextCommand;
            if (!command) return interaction.followUp("You have used a non existent command");
            command.run({
                client,
                interaction: interaction as UserContextMenuInteraction,
            });
            console.log(`${interaction.user.username}#${interaction.user.discriminator} used ${command.name} (USER) on ${interaction.guild}`);
        } else if (interaction.isMessageContextMenu()) {
            const command = client.commands.get(interaction.commandName) as MessageContextCommand;
            if (!command) return interaction.followUp("You have used a non existent command");
            command.run({
                client,
                interaction: interaction as MessageContextMenuInteraction,
            });
            console.log(`${interaction.user.username}#${interaction.user.discriminator} used ${command.name} (MESSAGE) on ${interaction.guild}`);
        }
    }
});
