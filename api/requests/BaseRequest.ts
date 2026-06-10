import { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class BaseRequest {
  constructor(protected readonly request: APIRequestContext) {}

  protected get(url: string): Promise<APIResponse> {
    return this.request.get(url);
  }

  protected post<T>(url: string, data: T): Promise<APIResponse> {
    return this.request.post(url, { data });
  }

  protected put<T>(url: string, data: T): Promise<APIResponse> {
    return this.request.put(url, { data });
  }

  protected delete(url: string): Promise<APIResponse> {
    return this.request.delete(url);
  }
}
