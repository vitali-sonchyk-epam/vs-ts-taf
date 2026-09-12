import { test, expect } from '../../fixtures/apiFixture';
import { Tags } from '../../constants/Tags';
import { HttpStatus } from '../../constants/HttpStatus';
import { ActivityBuilder } from '../../api/builders/ActivityBuilder';
import { activityCreateCases, invalidActivityCase } from '../../testData/ActivityTestData';

const nonExistentActivityId = 999_999;

test.describe('Activities API', () => {
  test('Returns the list of activities', { tag: Tags.Smoke }, async ({ activitiesService }) => {
    const activities = await activitiesService.getActivities();

    expect(activities.length).toBeGreaterThan(0);
    expect(activities[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        dueDate: expect.any(String),
        completed: expect.any(Boolean),
      }),
    );
  });

  test('Returns a single activity by id', { tag: Tags.Smoke }, async ({ activitiesService }) => {
    const existingId = await activitiesService.getExistingActivityId();

    const activity = await activitiesService.getActivity(existingId);

    expect(activity.id).toEqual(existingId);
  });

  test(
    'Returns not found for a non-existent activity',
    { tag: Tags.Extended },
    async ({ activitiesService }) => {
      const response = await activitiesService.getActivityResponse(nonExistentActivityId);

      expect(response.status).toEqual(HttpStatus.NotFound);
      expect(response.body.title).toEqual('Not Found');
    },
  );

  activityCreateCases.forEach((activityCase) => {
    test(
      `Creates an activity for case: ${activityCase.name}`,
      { tag: Tags.Smoke },
      async ({ activitiesService }) => {
        const created = await activitiesService.createActivity(activityCase.payload);

        expect(created).toEqual(
          expect.objectContaining({
            id: activityCase.payload.id,
            title: activityCase.payload.title,
            completed: activityCase.payload.completed,
          }),
        );
        expect(new Date(created.dueDate).toISOString()).toEqual(
          new Date(String(activityCase.payload.dueDate)).toISOString(),
        );
      },
    );
  });

  test('Updates an existing activity', { tag: Tags.Smoke }, async ({ activitiesService }) => {
    const existingId = await activitiesService.getExistingActivityId();
    const payload = ActivityBuilder.random().withId(existingId).withCompleted(true).build();

    const updated = await activitiesService.updateActivity(existingId, payload);

    expect(updated).toEqual(
      expect.objectContaining({
        id: existingId,
        title: payload.title,
        completed: true,
      }),
    );
  });

  test('Deletes an existing activity', { tag: Tags.Smoke }, async ({ activitiesService }) => {
    const existingId = await activitiesService.getExistingActivityId();

    await expect(activitiesService.deleteActivity(existingId)).resolves.toBeUndefined();
  });

  test(
    `Rejects an ${invalidActivityCase.name}`,
    { tag: Tags.Extended },
    async ({ activitiesService }) => {
      const response = await activitiesService.createActivityResponse(invalidActivityCase.payload);

      expect(response.status).toEqual(HttpStatus.BadRequest);
      expect(response.body.errors).toBeDefined();
    },
  );

  test(
    'Returns only completed activities',
    { tag: Tags.Extended },
    async ({ activitiesService }) => {
      const completedActivities = await activitiesService.getCompletedActivities();

      expect(completedActivities.length).toBeGreaterThan(0);
      expect(completedActivities.every((activity) => activity.completed)).toBe(true);
    },
  );
});
