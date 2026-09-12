import { ActivitiesClient } from '../clients/Activities.client';
import { Logger } from '../../utils/Logger';
import type { Activity, ActivityPayload } from '../models/Activity';
import type { ProblemDetails } from '../models/ProblemDetails';
import { ApiResponse } from '../utils/apiResponse';
import { jsonBody } from '../utils/jsonBody';

/**
 * Business-level API for the Activities module. Owns both directions of the
 * conversion: payloads are serialised before reaching the client, and raw
 * responses are deserialised into typed models on the way back.
 *
 * Note: the FakeRestAPI backend is non-persistent — writes are echoed back but
 * never stored, so callers must assert on the returned payload rather than on a
 * follow-up read.
 */
export class ActivitiesService {
  private readonly client = new ActivitiesClient();

  async getActivities(): Promise<Activity[]> {
    Logger.info('Fetching all activities');
    const rawResponse = await this.client.getAll();
    const response = await ApiResponse.from<Activity[]>(rawResponse);
    return response.expectOk();
  }

  async getActivity(id: number): Promise<Activity> {
    Logger.info('Fetching activity with id %s', id);
    const rawResponse = await this.client.getById(id);
    const response = await ApiResponse.from<Activity>(rawResponse);
    return response.expectOk();
  }

  async createActivity(activity: ActivityPayload): Promise<Activity> {
    Logger.info('Creating activity: %j', activity);
    const rawResponse = await this.client.create(jsonBody(activity));
    const response = await ApiResponse.from<Activity>(rawResponse);
    return response.expectOk();
  }

  async updateActivity(id: number, activity: ActivityPayload): Promise<Activity> {
    Logger.info('Updating activity %s with: %j', id, activity);
    const rawResponse = await this.client.update(id, jsonBody(activity));
    const response = await ApiResponse.from<Activity>(rawResponse);
    return response.expectOk();
  }

  async deleteActivity(id: number): Promise<void> {
    Logger.info('Deleting activity with id %s', id);
    const rawResponse = await this.client.remove(id);
    const response = await ApiResponse.from<void>(rawResponse);
    response.expectOk();
  }

  /**
   * Raw read for negative scenarios, so tests can assert on the error payload.
   */
  async getActivityResponse(id: number): Promise<ApiResponse<ProblemDetails>> {
    Logger.info('Fetching activity with id %s (raw response)', id);
    const rawResponse = await this.client.getById(id);
    return ApiResponse.from<ProblemDetails>(rawResponse);
  }

  /**
   * Raw create for negative scenarios, so tests can assert on validation errors.
   */
  async createActivityResponse(activity: ActivityPayload): Promise<ApiResponse<ProblemDetails>> {
    Logger.info('Creating activity (raw response): %j', activity);
    const rawResponse = await this.client.create(jsonBody(activity));
    return ApiResponse.from<ProblemDetails>(rawResponse);
  }

  async getCompletedActivities(): Promise<Activity[]> {
    const activities = await this.getActivities();
    Logger.info('Filtering %s activities down to the completed ones', activities.length);
    return activities.filter((activity) => activity.completed);
  }

  /**
   * Resolves an id from the seeded data so tests do not depend on hardcoded ids.
   */
  async getExistingActivityId(): Promise<number> {
    const [firstActivity] = await this.getActivities();
    if (!firstActivity) {
      throw new Error('No activities returned by the API; cannot resolve an existing activity id.');
    }
    return firstActivity.id;
  }
}
