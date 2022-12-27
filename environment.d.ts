declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string;
      GUILD_ID: string;
      ENVIRONMENT: "dev" | "prod" | "debug";
      WEATHER_API_URL: string;
      WEATHER_API_TOKEN: string;
    }
  }
}

export {};
