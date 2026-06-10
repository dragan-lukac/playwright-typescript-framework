import { APIResponse } from '@playwright/test';

export abstract class BaseService {
  protected assertStatus(response: APIResponse, expectedStatus: number): void {
    if (response.status() !== expectedStatus) {
      throw new Error(`Unexpected status ${response.status()}, expected ${expectedStatus}`);
    }
  }

  protected async parse<T>(response: APIResponse, expectedStatus: number): Promise<T> {
    this.assertStatus(response, expectedStatus);
    return response.json();
  }
}
