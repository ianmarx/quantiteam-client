import type { APIError } from '../types';

export default function getErrorAction(type: string, error: APIError, statusText: ?string) : Object {
  return {
    type,
    payload: {
      status: error.response.status,
      statusText: statusText || error.response.statusText,
    },
  };
}
