import { Activity } from '../../data/Activity';
import { BaseRequest } from './BaseRequest';

const BASE = '/api/v1/Activities';

export class ActivityRequest extends BaseRequest {
  getActivities()                            { return this.get(BASE); }
  getActivity(id: number)                    { return this.get(`${BASE}/${id}`); }
  createActivity(data: Omit<Activity, 'id'>) { return this.post(BASE, data); }
  updateActivity(id: number, data: Activity) { return this.put(`${BASE}/${id}`, data); }
  deleteActivity(id: number)                 { return this.delete(`${BASE}/${id}`); }
}
