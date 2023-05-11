import {startTransition} from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {userReducer} from './userReducer';
import {chatBoxesReducer} from './chatBoxesReducer';
// Actions:
// chatBoxes/created
// chatBoxes/edited
// chatBoxes/deleted
// chatBoxes/loading //add this

//  Chatbox/Messages/added
//  Chatbox/Messages/read
//  Chatbox/Messages/deleted
//  Chatbox/Messages/edited
//  Chatbox/Messages/loading //add this
//  Chatbox/Messages/Ityping //add this
//  Chatbox/Messages/Othertyping //add this

//  User/Register
//  User/Login
//  User/Logout
//  User/Loading (after login and register submit) //add this

const rootReducer = combineReducers({
  user: userReducer,
  chatBoxes: chatBoxesReducer,
  // Messages: MessagesReducer,
});

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
// export const store = createStore(rootReducer, middlewareEnhancer);
export const store = createStore(rootReducer, middlewareEnhancer);

// Selectors
export function selelectReadTill(state) {
  return state.readTill;
}

// export function selectMessages(state) {
//   return state.messages;
// }

// console.log('state: ', store.getState());
