export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  defaultHeaders: Record<string, string>;
}

export const apiConfig: ApiConfig = {
  baseUrl: process.env['API_BASE_URL'] ?? 'https://fakerestapi.azurewebsites.net',
  timeout: 30_000,
  defaultHeaders: {
    Accept: 'application/json',
  },
};
