import {startTransition} from 'react';
import {combineReducers, createStore} from 'redux';

const initalState = {
  User: {Username: 'Vaibhav', token: ''},
  isLogged: false,
  readTill: Date.now(),
  messages: [
    {
      sender: 'Vaibhav',
      time: Date.now(),
      text: 'hello everyone',
      id: 1,
    },
    {
      sender: 'Rahul',
      time: Date.now(),
      text: 'hi',
      id: 2,
    },
    {
      sender: 'Vaibhav',
      time: Date.now(),
      text: 'hello everyone',
      id: 3,
    },
  ],
  modal: false,
};

// Actions:
//  Messages/add
//  Messages/read
//  Messages/delete
//  Messages/edit

//  User/Register
//  User/Login
//  User/Logout
let numId = 1000;

function MYReducer(state = initalState, action) {
  switch (action.type) {
    case 'User/Login':
      return {
        ...state,
        User: {
          UserName: action.username,
          token: action.token,
        },
      };
    case 'User/Register':
      return {
        ...state,
        User: {
          UserName: action.username,
          token: action.token,
        },
      };
    case 'User/Logout':
      return {
        ...state,
        User: null,
      };
    case 'Messages/add':
      // console.log(action.payload);

      return {
        ...state,
        messages: [
          ...state.messages,
          {
            sender: state.User.Username,
            time: Date.now(),
            isRead: false,
            text: action.payload.text,
            id: action.payload.id || ++numId,
          },
        ],
      };
    case 'Messages/read':
      return {
        ...state,
        readTill: action.payload.time,
      };
    case 'Messages/delete':
      return {
        ...state,
        messages: state.messages.filter(mes => mes.id !== action.payload.id),
      };
    case 'Messages/edit':
      return {
        ...state,
        messages: state.messages.map(mes =>
          mes.id === action.payload.id
            ? {...mes, text: action.payload.text}
            : mes,
        ),
      };
    default:
      return state;
  }
}

export function selelectReadTill(state) {
  return state.readTill;
}
export function selectMessages(state) {
  return state.messages;
}
export function selectCurrentUser(state) {
  return state.User;
}
export function selectUsername(state) {
  return state.User.Username;
}

function UserReducer(state = initalState, action) {
  switch (action.type) {
    case 'User/Login':
      return {
        ...state,
        User: {
          UserName: action.username,
          token: action.token,
        },
      };
    case 'User/Register':
      return {
        ...state,
        User: {
          UserName: action.username,
          token: action.token,
        },
      };
    case 'User/Logout':
      return {
        ...state,
        User: null,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  User: UserReducer,
  // Messages: MessagesReducer,
});

export const store = createStore(MYReducer);

// console.log('state: ', store.getState());
