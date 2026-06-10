export interface Activity {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

export const newActivity: Omit<Activity, 'id'> = {
  title: 'Test Activity',
  dueDate: '2025-01-01T00:00:00.000Z',
  completed: false,
};

export const updatedActivity: Activity = {
  id: 1,
  title: 'Updated Activity',
  dueDate: '2025-06-01T00:00:00.000Z',
  completed: true,
};
