import {createSlice} from '@reduxjs/toolkit';
import {initalState} from './initalState';
import {act} from 'react-test-renderer';
import {
  db_getCurrentUser,
  db_remCurrentUser,
  db_setCurrentUser,
} from '../database.native';

let userId = 1000;

const user = {
  status: 'no_user', // 'no_user'|'idle' | 'login_submitting' | 'login_succeeded' | 'login_failed'| 'register_submitting' |'register_succeeded','register_failed',
  // username: 'Vaibhav',
  // token: 'abcd',
  // id: 1,
};

const userSlice = createSlice({
  name: 'user',
  initialState: user,
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
      state.uid = '';
    },
    submit: (state, action) => {
      state.status = 'submitting';
    },
    failed: (state, action) => {
      state.status = 'no_user';
      // state.message = action.payload.message;
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
export const getUserFromDB_f = () => async (dispatch, getState) => {
  console.log('checking db for user');
  const user = await db_getCurrentUser();
  if (user?.uid) {
    dispatch({
      type: 'user/login',
      payload: {
        username: user.name,
        token: user.token,
        id: user.uid,
      },
    });
  }
  // console.log('user not in db');
};

export const setUserInDB_f = user => async (dispatch, getState) => {
  await db_setCurrentUser(user);
  dispatch({
    type: 'user/login',
    payload: {
      username: user.name,
      id: user.uid,
    },
  });
};

export const remUserFromDB_f = () => async (dispatch, getState) => {
  await db_remCurrentUser();
  dispatch({
    type: 'user/logout',
  });
};
