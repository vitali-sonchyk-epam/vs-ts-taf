import type { APIResponse } from '@playwright/test';
import { HttpStatus } from '../../constants/HttpStatus';
import { ApiError } from './apiError';

/**
 * Wraps a Playwright `APIResponse` with its already-parsed body and lets
 * callers assert the status fluently: `(await client.getAll()).expectOk()`.
 */
export class ApiResponse<T> {
  private constructor(
    readonly status: number,
    readonly ok: boolean,
    readonly headers: Record<string, string>,
    readonly body: T,
    readonly raw: APIResponse,
  ) {}

  static async from<T>(response: APIResponse): Promise<ApiResponse<T>> {
    return new ApiResponse<T>(
      response.status(),
      response.ok(),
      response.headers(),
      await ApiResponse.parseBody<T>(response),
      response,
    );
  }

  /**
   * Parses the body as JSON, tolerating the empty bodies returned by `DELETE`
   * and the version-suffixed `application/json; v=1.0` content type.
   */
  private static async parseBody<T>(response: APIResponse): Promise<T> {
    const text = await response.text();
    if (text.trim().length === 0) {
      return undefined as unknown as T;
    }

    try {
      return JSON.parse(text) as T;
    } catch {
      return text as unknown as T;
    }
  }

  expectStatus(expectedStatus: number): T {
    if (this.status !== expectedStatus) {
      throw new ApiError(this.raw.url(), expectedStatus, this.status, this.body);
    }
    return this.body;
  }

  expectOk(): T {
    return this.expectStatus(HttpStatus.Ok);
  }
}
