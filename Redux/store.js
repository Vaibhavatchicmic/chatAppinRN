import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {userReducer} from './userReducer';
import {chatBoxesReducer} from './chatBoxesReducer';
import {messagesReducer} from './messagesReducer';
// Actions:
// chatBoxes/created
// chatBoxes/edited
// chatBoxes/deleted
// chatBoxes/loading //add this

//  Messages/added
//  Messages/read
//  Messages/deleted
//  Messages/edited
//  Messages/loading //add this
//  Messages/Ityping //add this
//  Messages/Othertyping //add this

//  User/Register
//  User/Login
//  User/Logout
//  User/Loading (after login and register submit) //add this

const createDebugger = require('redux-flipper').default; // <-- ADD THIS

const configureCustomStore = () => {
  const rootReducer = combineReducers({
    user: userReducer,
    chatBoxes: chatBoxesReducer,
    messages: messagesReducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(createDebugger()), // <-- ADD THIS
  });

  return {store};
};

export const {store} = configureCustomStore();

// export const store = configureStore({
//   reducer: {},
// });
