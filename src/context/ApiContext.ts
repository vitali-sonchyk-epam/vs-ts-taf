import { APIRequestContext } from '@playwright/test';

export class ApiContext {
  private static currentRequest: APIRequestContext | undefined;

  static set(request: APIRequestContext): void {
    ApiContext.currentRequest = request;
  }

  static get(): APIRequestContext {
    if (!ApiContext.currentRequest) {
      throw new Error(
        'No active API request context. Ensure the api-binding auto fixture is registered.',
      );
    }
    return ApiContext.currentRequest;
  }

  static clear(): void {
    ApiContext.currentRequest = undefined;
  }
}
