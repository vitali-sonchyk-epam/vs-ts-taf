declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
    HEADLESS: string;
    LOG_LEVEL: string;
    REPORTER: string;
    RP_ENDPOINT: string;
    RP_PROJECT: string;
    RP_API_KEY: string;
    RP_LAUNCH: string;
    DOWNLOAD_PATH: string;
  }
}
