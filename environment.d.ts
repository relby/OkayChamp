declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            guildId: string;
            environment: "dev" | "prod" | "debug";
            WEATHER_API_URL: string;
            WEATHER_API_TOKEN: string;
        }
    }
}

export {};
