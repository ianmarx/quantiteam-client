import getErrorAction from '../../src/utils/actions';

describe('utils/actions', () => {
  it('should return expected value from getErrorAction', () => {
    const error = {
      message: 'error message',
      response: {
        status: 500,
        statusText: 'error status text',
      },
    };

    expect(getErrorAction('AUTH_USER_FAILURE', error)).toEqual({
      type: 'AUTH_USER_FAILURE',
      payload: {
        status: error.response.status,
        statusText: error.response.statusText,
        message: error.message,
      },
    });
  });

  it('should return expected value from getErrorAction when error has no status', () => {
    const error = {
      message: 'error message',
    };

    expect(getErrorAction('AUTH_USER_FAILURE', error)).toEqual({
      type: 'AUTH_USER_FAILURE',
      payload: {
        status: null,
        statusText: null,
        message: 'error message',
      },
    });
  });
});
