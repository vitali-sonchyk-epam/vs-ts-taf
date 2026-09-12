import type { RequestOptions } from '../../types/api';

/**
 * Serialises a payload into a JSON request body. Lives in the service layer's
 * toolbox: clients receive an already-encoded body and stay transport-only.
 */
export function jsonBody(payload: unknown): RequestOptions {
  return {
    data: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  };
}
