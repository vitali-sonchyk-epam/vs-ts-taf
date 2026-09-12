import { ActivityBuilder } from '../api/builders/ActivityBuilder';
import { ActivityPayload } from '../api/models/Activity';

export interface ActivityCase {
  name: string;
  payload: ActivityPayload;
}

export const activityCreateCases: ActivityCase[] = [
  {
    name: 'completed activity',
    payload: ActivityBuilder.instance()
      .withId(1001)
      .withTitle('Completed activity')
      .withDueDate('2030-01-01T00:00:00Z')
      .withCompleted(true)
      .build(),
  },
  {
    name: 'pending activity',
    payload: ActivityBuilder.instance()
      .withId(1002)
      .withTitle('Pending activity')
      .withDueDate('2030-06-15T12:30:00Z')
      .withCompleted(false)
      .build(),
  },
  {
    name: 'randomly generated activity',
    payload: ActivityBuilder.random().build(),
  },
];

export const invalidActivityCase: ActivityCase = {
  name: 'activity with a malformed due date',
  payload: {
    id: 1003,
    title: 'Invalid due date',
    dueDate: 'not-a-date',
    completed: false,
  },
};
