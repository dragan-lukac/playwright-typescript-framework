import { Activity, newActivity } from '../../data/Activity';
import { ActivityRequest } from '../requests/ActivityRequest';
import { BaseService } from './BaseService';

export class ActivityService extends BaseService {
  constructor(private readonly request: ActivityRequest) { super(); }

  async getActivities(): Promise<Activity[]> {
    return this.parse<Activity[]>(await this.request.getActivities(), 200);
  }

  async getActivity(id: number): Promise<Activity> {
    return this.parse<Activity>(await this.request.getActivity(id), 200);
  }

  async createActivity(data: Omit<Activity, 'id'>): Promise<Activity> {
    return this.parse<Activity>(await this.request.createActivity(data), 200);
  }

  async createCompletedActivity(): Promise<Activity> {
    return this.createActivity({ ...newActivity, completed: true });
  }

  async createNonCompletedActivity(): Promise<Activity> {
    return this.createActivity({ ...newActivity, completed: false });
  }

  async updateActivity(id: number, data: Activity): Promise<Activity> {
    return this.parse<Activity>(await this.request.updateActivity(id, data), 200);
  }

  async deleteActivity(id: number): Promise<void> {
    this.assertStatus(await this.request.deleteActivity(id), 200);
  }

  async getNonExistingActivity(id: number): Promise<number> {
    return (await this.request.getActivity(id)).status();
  }
}
