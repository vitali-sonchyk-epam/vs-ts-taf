import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiContext } from '../../../context/ApiContext';
import { Logger } from '../../../utils/Logger';
import type { RequestOptions } from '../../../types/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Transport-only base for API clients. Performs HTTP calls and hands back
 * Playwright's raw `APIResponse`: it neither asserts nor deserialises, so
 * status handling and body parsing stay in the service layer.
 */
export abstract class BaseClient {
  protected get request(): APIRequestContext {
    return ApiContext.get();
  }

  protected constructor(private readonly basePath: string) {}

  protected async get(path = '', options: RequestOptions = {}): Promise<APIResponse> {
    return this.send('GET', path, options);
  }

  protected async post(path = '', options: RequestOptions = {}): Promise<APIResponse> {
    return this.send('POST', path, options);
  }

  protected async put(path = '', options: RequestOptions = {}): Promise<APIResponse> {
    return this.send('PUT', path, options);
  }

  protected async delete(path = '', options: RequestOptions = {}): Promise<APIResponse> {
    return this.send('DELETE', path, options);
  }

  private async send(
    method: HttpMethod,
    path: string,
    options: RequestOptions,
  ): Promise<APIResponse> {
    const url = `${this.basePath}${path}`;
    Logger.info('%s %s', method, url);

    const response = await this.request.fetch(url, {
      ...options,
      method,
      failOnStatusCode: false,
    });

    Logger.debug('%s %s responded with status %s', method, url, response.status());
    return response;
  }
}
