import { ActivityPayload } from '../models/Activity';
import { Random } from '../../utils/randomGenerator';

export class ActivityBuilder {
  private readonly activity: ActivityPayload;

  constructor() {
    this.activity = {};
  }

  static instance = () => new ActivityBuilder();

  static random = (): ActivityBuilder =>
    new ActivityBuilder()
      .withId(Random.number())
      .withTitle(`Activity ${Random.string()}`)
      .withDueDate(Random.futureDateTime())
      .withCompleted(Random.boolean());

  withId(id: number): this {
    this.activity.id = id;
    return this;
  }

  withTitle(title: string | null): this {
    this.activity.title = title;
    return this;
  }

  withDueDate(dueDate: string): this {
    this.activity.dueDate = dueDate;
    return this;
  }

  withCompleted(completed: boolean): this {
    this.activity.completed = completed;
    return this;
  }

  build = (): ActivityPayload => this.activity;
}
