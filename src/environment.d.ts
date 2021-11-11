declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEWS_API_KEY: string,
      NODE_ENV: "development" | "production" | "test",
      DB_URI: string,
      PORT: number
    }
  }
}

export {};
