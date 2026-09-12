declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string;
    API_BASE_URL: string;
    HEADLESS: string;
    LOG_LEVEL: string;
    REPORTER: string;
    JSON_REPORT_FILE: string;
    JUNIT_OUTPUT_FILE: string;
    RP_ENDPOINT: string;
    RP_PROJECT: string;
    RP_API_KEY: string;
    RP_LAUNCH: string;
    DOWNLOAD_PATH: string;
    ANTHROPIC_API_KEY: string;
    AGENT_REPORT_DIR: string;
  }
}
