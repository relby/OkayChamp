import { ApplicationCommandOptionChoiceData } from "discord.js";

export const ANIME_API_URL = "https://waifu.now.sh/"

export const SFW_CHOICES: ApplicationCommandOptionChoiceData[]  = [
  { name: "waifu", value: "waifu" },
  { name: "neko", value: "neko" },
  { name: "shinobu", value: "shinobu" },
  { name: "bully", value: "bully" },
  { name: "cry", value: "cry" },
  { name: "hug", value: "hug" },
  { name: "kiss", value: "kiss" },
  { name: "lick", value: "lick" },
  { name: "pat", value: "pat" },
  { name: "smug", value: "smug" },
  { name: "highfive", value: "highfive" },
  { name: "nom", value: "nom" },
  { name: "bite", value: "bite" },
  { name: "slap", value: "slap" },
  { name: "wink", value: "wink" },
  { name: "poke", value: "poke" },
  { name: "dance", value: "dance" },
  { name: "cringe", value: "cringe" },
  { name: "blush", value: "blush" },
  { name: "random", value: "random" }
];
export const NSFW_CHOICES: ApplicationCommandOptionChoiceData[] = [
  { name: "waifu", value: "waifu" },
  { name: "neko", value: "neko" },
  { name: "trap", value: "trap" },
  { name: "blowjob", value: "blowjob" },
  { name: "random", value: "random" }
];

export const fileName = (endpoint: string, isSpoiler: boolean, extention: string): string => {
  return `${isSpoiler ? "SPOILER_" : ""}${endpoint}.${extention}`;
}