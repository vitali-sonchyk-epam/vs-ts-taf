export class ApiError extends Error {
  constructor(
    readonly url: string,
    readonly expectedStatus: number,
    readonly actualStatus: number,
    readonly body: unknown,
  ) {
    super(
      `Request to ${url} expected status ${expectedStatus} but received ${actualStatus}. ` +
        `Response body: ${JSON.stringify(body)}`,
    );
    this.name = 'ApiError';
  }
}
