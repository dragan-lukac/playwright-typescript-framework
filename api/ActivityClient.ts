import { APIRequestContext } from '@playwright/test';
import { Activity } from '../data/apiTypes';

export class ActivityClient {
  constructor(private readonly request: APIRequestContext) {}

  async getActivities() {
    return this.request.get('/api/v1/Activities');
  }

  async getActivity(id: number) {
    return this.request.get(`/api/v1/Activities/${id}`);
  }

  async createActivity(data: Omit<Activity, 'id'>) {
    return this.request.post('/api/v1/Activities', { data });
  }

  async updateActivity(id: number, data: Activity) {
    return this.request.put(`/api/v1/Activities/${id}`, { data });
  }

  async deleteActivity(id: number) {
    return this.request.delete(`/api/v1/Activities/${id}`);
  }
}
