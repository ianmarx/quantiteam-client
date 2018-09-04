import type { APIError } from '../types';

export default function getErrorAction(type: string, error: APIError, statusText: ?string) : Object {
  return {
    type,
    payload: {
      status: error.response ? error.response.status : null,
      statusText: error.response ? error.response.statusText : null,
      message: error.message,
    },
  };
}
