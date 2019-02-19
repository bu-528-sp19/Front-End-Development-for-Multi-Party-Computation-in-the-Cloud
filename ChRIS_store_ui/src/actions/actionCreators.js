import * as types from './types';

export function handleSubmit({ token, username }) {
  return {
    type: types.HANDLE_SUBMIT,
    token,
    username,
  };
}
