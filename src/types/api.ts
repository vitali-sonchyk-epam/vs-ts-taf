export interface RequestOptions {
  params?: Record<string, string | number | boolean>;
  /** Already-serialised request body; services own the encoding. */
  data?: string;
  headers?: Record<string, string>;
}
