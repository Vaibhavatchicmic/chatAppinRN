import {createSlice} from '@reduxjs/toolkit';
import {initalState} from './initalState';

let userId = 1000;

const userSlice = createSlice({
  name: 'user',
  initialState: initalState.user,
  reducers: {
    login: (state, action) => {
      return {
        username: action.payload.username,
        token: action.payload.token,
        id: action.payload.id || ++userId,
      };
    },
    register: (state, action) => {
      return {
        username: action.payload.username,
        token: action.payload.token,
        id: action.payload.id || ++userId,
      };
    },
    logout: (state, action) => {
      return null;
    },
  },
});
const userReducer = userSlice.reducer;
export const {login, register, logout} = userSlice.actions; //action creater function

export {userReducer};

export function selectCurrentUser(state) {
  return state.user;
}
export function selectUsername(state) {
  return state.user.username;
}
