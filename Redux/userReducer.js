import {createSlice} from '@reduxjs/toolkit';
import {initalState} from './initalState';
import {act} from 'react-test-renderer';

let userId = 1000;

const userSlice = createSlice({
  name: 'user',
  initialState: initalState.user,
  reducers: {
    login: (state, action) => {
      return {
        status: 'idle',
        username: action.payload.username,
        token: action.payload.token,
        id: action.payload.id || ++userId,
      };
    },
    register: (state, action) => {
      return {
        status: 'idle',
        username: action.payload.username,
        token: action.payload.token,
        id: action.payload.id || ++userId,
      };
    },
    logout: (state, action) => {
      state.status = 'no_user';
    },
  },
});

// function midwLogOut(dipatch, navigation) {
//   navigation.navigate('SplashScreen');
//   dipatch({
//     type: 'user/logout',
//   });
// }

const userReducer = userSlice.reducer;
export const {login, register, logout} = userSlice.actions; //action creater function

export {userReducer};

export function selectCurrentUser(state) {
  return state.user;
}
export function selectUsername(state) {
  return state.user.username;
}
