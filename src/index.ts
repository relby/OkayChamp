require("dotenv").config();
import { Player } from "discord-player";
import { ExtendedClient } from "./classes/Client";

export const client = new ExtendedClient();
export const player = new Player(client);

client.start();
