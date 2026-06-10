import { APIRequestContext, APIResponse } from '@playwright/test';
import { logger, isEnabled } from '../../config/logger';

export abstract class BaseRequest {
  constructor(protected readonly request: APIRequestContext) {}

  protected get(url: string): Promise<APIResponse> {
    return this.send('GET', url, () => this.request.get(url));
  }

  protected post<T>(url: string, data: T): Promise<APIResponse> {
    return this.send('POST', url, () => this.request.post(url, { data }), data);
  }

  protected put<T>(url: string, data: T): Promise<APIResponse> {
    return this.send('PUT', url, () => this.request.put(url, { data }), data);
  }

  protected delete(url: string): Promise<APIResponse> {
    return this.send('DELETE', url, () => this.request.delete(url));
  }

  private async send(
    method: string,
    url: string,
    fn: () => Promise<APIResponse>,
    body?: unknown
  ): Promise<APIResponse> {
    logger.info(`→ [${method}] ${url}`);
    if (body !== undefined) logger.debug(`   request body: ${JSON.stringify(body)}`);

    const start = Date.now();
    const response = await fn();
    const duration = Date.now() - start;
    const status = response.status();

    if (status >= 400) {
      const responseBody = await response.json().catch(() => '[unparseable]');
      logger.error(`← [${status}] ${url}  (${duration}ms)  body: ${JSON.stringify(responseBody)}`);
    } else {
      logger.info(`← [${status}] ${url}  (${duration}ms)`);
      if (isEnabled('debug')) {
        logger.debug(`   response body: ${JSON.stringify(await response.json().catch(() => null))}`);
      }
    }

    return response;
  }
}
