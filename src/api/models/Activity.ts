export interface Activity {
  id: number;
  title: string | null;
  dueDate: string;
  completed: boolean;
}

export type ActivityPayload = Partial<Activity>;
