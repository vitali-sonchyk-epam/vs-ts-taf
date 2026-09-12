import type { APIResponse } from '@playwright/test';
import { BaseClient } from './base/BaseClient';
import { ApiEndpoints } from '../../constants/ApiEndpoints';
import type { RequestOptions } from '../../types/api';

/**
 * HTTP client for the Activities controller. It deals exclusively in
 * Playwright's transport types: bodies arrive already serialised and every
 * method returns the raw `APIResponse`, leaving parsing and status handling to
 * the service layer.
 */
export class ActivitiesClient extends BaseClient {
  constructor() {
    super(ApiEndpoints.Activities);
  }

  async getAll(): Promise<APIResponse> {
    return this.get();
  }

  async getById(id: number): Promise<APIResponse> {
    return this.get(`/${id}`);
  }

  async create(body: RequestOptions): Promise<APIResponse> {
    return this.post('', body);
  }

  async update(id: number, body: RequestOptions): Promise<APIResponse> {
    return this.put(`/${id}`, body);
  }

  async remove(id: number): Promise<APIResponse> {
    return this.delete(`/${id}`);
  }
}
