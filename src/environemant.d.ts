declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEWS_KEY: string,
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
