import {
  ApplicationCommandData,
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  MessageApplicationCommandData,
  MessageContextMenuInteraction,
  PermissionResolvable,
  UserApplicationCommandData,
  UserContextMenuInteraction,
} from "discord.js";
import { ExtendedClient } from "../classes/Client";

export interface ExtendedChatCommandInteraction extends CommandInteraction {
  member: GuildMember;
}

export interface ChatCommandRunOptions {
  client: ExtendedClient;
  interaction: ExtendedChatCommandInteraction;
  args: CommandInteractionOptionResolver;
}

export interface UserContextRunOptions {
  client: ExtendedClient;
  interaction: UserContextMenuInteraction;
}

export interface MessageContextRunOptions {
  client: ExtendedClient;
  interaction: MessageContextMenuInteraction;
}

type ChatCommandRunFunction = (options: ChatCommandRunOptions) => any;
type UserContextRunFunction = (options: UserContextRunOptions) => any;
type MessageContextRunFunction = (options: MessageContextRunOptions) => any;

export type ChatCommandType = {
  userPermissions?: PermissionResolvable[];
  run: ChatCommandRunFunction;
} & ChatInputApplicationCommandData

export type UserContextCommand = {
  userPermissions?: PermissionResolvable[];
  run: UserContextRunFunction;
} & UserApplicationCommandData

export type MessageContextCommand = {
  userPermissions?: PermissionResolvable[];
  run: MessageContextRunFunction;
} & MessageApplicationCommandData;

export type CommandType = ChatCommandType | UserContextCommand | MessageContextCommand;