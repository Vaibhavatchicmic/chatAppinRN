import {initalState} from './initalState';
let userId = 1000;

export function userReducer(state = initalState.user, action) {
  switch (action.type) {
    case 'user/login':
    case 'user/register':
      return {
        username: action.payload.username,
        token: action.payload.token,
        id: action.payload.id || ++userId,
      };
    case 'user/logout':
      return null;
    default:
      return state;
  }
}
export function selectCurrentUser(state) {
  return state.user;
}
export function selectUsername(state) {
  return state.user.username;
}
