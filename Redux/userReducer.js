import {createSlice} from '@reduxjs/toolkit';
import {initalState} from './initalState';
import {act} from 'react-test-renderer';
import {
  db_getCurrentUser,
  db_remCurrentUser,
  db_setCurrentUser,
} from '../database.native';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {action} from '@nozbe/watermelondb/decorators';
import {Alert} from 'react-native';
import {AUTH_KEY} from '../Utility/CometChat';

let userId = 1000;

const initUser = {
  status: 'no_user', // 'no_user'|'idle' | 'login_submitting' | 'login_succeeded' | 'login_failed'| 'register_submitting' |'register_succeeded','register_failed',
  // username: 'Vaibhav',
  // token: 'abcd',
  // id: 1,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {
    login: (state, action) => {
      state.status = 'idle';
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.id = action.payload.id || ++userId;
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
      state.id = '';
      state.token = '';
    },
    submit: (state, action) => {
      state.status = 'submitting';
    },
    failed: (state, action) => {
      state.status = 'no_user';
      // state.message = action.payload.message;
    },
    loading: (state, action) => {
      state.status = 'loading';
    },
    cancle: (state, action) => {
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
export const getUserFromDB_f = () => async (dispatch, getState) => {
  console.log('checking db for user');
  dispatch({
    type: 'user/loading',
  });
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
  } else {
    dispatch({type: 'user/failed'});
  }
  console.log('user in db', user);
};

export const setUserInDB_f = (user, type) => async (dispatch, getState) => {
  console.log('setting user in DB', user);
  await db_setCurrentUser(user);
  if (type === 'register') {
    dispatch({
      type: 'user/register',
      payload: {
        username: user.name,
        id: user.uid,
        token: user.token,
      },
    });
  } else {
    console.log('logging', user);
    dispatch({
      type: 'user/login',
      payload: {
        username: user.name,
        id: user.uid,
        token: user.token,
      },
    });
  }
};

export const remUserFromDB_f = () => async (dispatch, getState) => {
  await db_remCurrentUser();
  const user0 = await CometChat.getLoggedinUser();
  if (user0) {
    await CometChat.logout();
    console.log('logout from Cometchat');
  }
  dispatch({
    type: 'user/logout',
  });
};

export const handleLogin =
  (UserId, Password, setInputs) => async (dispatch, getState) => {
    console.log('loging');

    dispatch({
      type: 'user/submit',
    });

    const user = await CometChat.getLoggedinUser();

    if (!user) {
      console.log('trying to login');
      try {
        const res = await CometChat.login(UserId, AUTH_KEY);
        console.log(res);
        dispatch(
          setUserInDB_f({
            name: res.name,
            token: res.authToken,
            password: Password,
            uid: res.uid,
          }),
        );
        setInputs({UserId: '', Password: ''});
      } catch (e) {
        Alert.alert('Login failed', e.message?.replaceAll('UID', 'User Id'));
        console.error(e);
        dispatch({
          type: 'user/failed',
          // payload: {
          //   message: 'network request failed',
          // },
        });
      }
    } else {
      console.log('user already logged', user);
      dispatch(
        setUserInDB_f({
          name: user.name,
          token: user.authToken,
          password: Password,
          uid: user.uid,
        }),
      );
      setInputs({UserId: '', Password: ''});
    }
  };
