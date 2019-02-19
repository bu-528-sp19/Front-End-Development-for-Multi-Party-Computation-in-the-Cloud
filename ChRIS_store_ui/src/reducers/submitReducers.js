import isEmpty from 'lodash/isEmpty';
import { HANDLE_SUBMIT } from '../actions/types';

const initialState = {
  userName: window.sessionStorage.getItem('USERNAME'),
  authToken: window.sessionStorage.getItem('AUTH_TOKEN'),
  isLoggedIn: !isEmpty(window.sessionStorage.getItem('AUTH_TOKEN')),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HANDLE_SUBMIT:
      return {
        ...state,
        isLoggedIn: true,
        authToken: action.authToken,
        userName: action.userName,
      };
    default:
      return state;
  }
}
