/**
 * ASP.NET Core error payload returned for `400` and `404` responses.
 */
export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  traceId?: string;
  errors?: Record<string, string[]>;
}
