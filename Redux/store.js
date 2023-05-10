import {startTransition} from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
const initalState = {
  // user: {username: 'Vaibhav', token: 'abcd', id: 1},
  user: null,
  // isLogged: true, // getting from User currently
  chatBoxes: [
    {
      name: 'Global Group',
      isGroup: true,
      id: 125,
      readTill: Date.now(),
      IreadTill: Date.now(),
      messages: [
        {
          senderId: 1,
          time: Date.now(),
          text: 'hello everyone',
          id: 1,
          // readByAll: true,
        },
        {
          senderId: 2,
          time: Date.now(),
          text: 'hi',
          id: 2,
        },
        {
          senderId: 3,
          time: Date.now(),
          text: 'hello everyone',
          id: 3,
        },
      ],
    },
    {
      name: 'Robert Fox',
      isGroup: false,
      id: 123,
      readTill: Date.now(),
      IreadTill: Date.now(),
      messages: [
        {
          senderId: 1,
          time: Date.now(),
          text: 'hello everyone',
          id: 1,
          // readByAll: true,
        },
      ],
    },
    {
      name: 'Esther Howard',
      isGroup: true,
      id: 124,
      readTill: Date.now(),
      IreadTill: Date.now(),
      messages: [
        {
          senderId: 1,
          time: Date.now(),
          text: 'hello everyone',
          id: 1,
          // readByAll: true,
        },
        {
          senderId: 2,
          time: Date.now(),
          text: 'hi',
          id: 2,
        },
      ],
    },
  ],
  modal: false,
};

// Actions:
// chatBoxes/created
// chatBoxes/edited
// chatBoxes/deleted

//  Chatbox/Messages/added
//  Chatbox/Messages/read
//  Chatbox/Messages/deleted
//  Chatbox/Messages/edited

//  User/Register
//  User/Login
//  User/Logout
let mesId = 1000;
let chatId = 1000;
let userId = 1000;

// action creators
function MessageAdd(Message) {
  return {
    type: 'Message/Add',
  };
}

// Reducers

function messagesReducer(state = initalState.user[0].messages, action) {
  console.log('dispatch for messages :', action);
  switch (action.type) {
    case 'chatBoxes/messages/get':
      console.log('messages fetched :', action.payload.messages);
      return action.payload.messages;
    case 'chatBoxes/messages/added':
      return [
        ...state,
        {
          senderId: action.payload.senderId,
          time: action.payload.time || Date.now(),
          text: action.payload.text,
          id: action.payload.id || ++mesId,
        },
      ];
    case 'chatBoxes/messages/readByMe':
      return state;
    // return state.map(mes => {
    //   if (action.payload.id === mes.id) {
    //     return {
    //       ...mes,
    //       readByAll: action.payload.readByAll,
    //     };
    //   }
    // });
    case 'chatBoxes/messages/deleted':
      return state.filter(mes => {
        return mes.id !== action.payload.id;
      });
    case 'chatBoxes/messages/edited':
      return state.map(mes => {
        if (mes.id === action.payload.id) {
          return {
            ...mes,
            text: action.payload.text,
          };
        } else {
          return mes;
        }
      });
    default:
      return state;
  }
}

function userReducer(state = initalState.user, action) {
  switch (action.type) {
    case 'user/login':
      return {
        username: action.payload.username,
        token: action.payload.token,
        id: action.payload.id || ++userId,
      };
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
function chatBoxesReducer(state = initalState.chatBoxes, action) {
  switch (action.type) {
    case 'chatBoxes/read':
      return action.payload.chatBoxes;
    case 'chatBoxes/created':
      return [
        ...state,
        {
          name: action.payload.name,
          isGroup: action.payload.isGroup,
          id: action.payload.id || ++chatId,
          readTill: action.payload.time || Date.now(),
          IreadTill: action.payload.time || Date.now(),
          messages: [],
        },
      ];
    case 'chatBoxes/deleted':
      return state.filter(chatBox => {
        return chatBox.id !== action.payload.id;
      });
    case 'chatBoxes/messages/added':
    case 'chatBoxes/messages/readByMe':
    case 'chatBoxes/messages/deleted':
    case 'chatBoxes/messages/edited':
    case 'chatBoxes/messages/get':
      console.log('messages dispatch called action:', action);
      return state.map(chatBox => {
        if (chatBox.id === action.payload.chatBoxId) {
          // console.log('dispatch of messages for group', chatBox);
          return {
            ...chatBox,
            messages: messagesReducer(chatBox.messages, action),
          };
        } else {
          return chatBox;
        }
      });
    default:
      return state;
  }
}

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

export function getMessagesByGroupId(id) {
  return function selectMessages2(state) {
    // console.log('for id and state', id, state);
    return state.chatBoxes.reduce((acc, chatBox) => {
      if (chatBox.id === id) {
        acc = chatBox.messages;
      }
      // console.log('acc is', acc);
      return acc;
    }, []);
  };
}
export function getChatBoxbyId(id) {
  return function selectChatBox(state) {
    return state.chatBoxes.reduce((acc, chatBox) => {
      if (chatBox.id === id) {
        acc = chatBox;
      }
      // console.log('acc is', acc);
      return acc;
    }, []);
  };
}
export function selectCurrentUser(state) {
  return state.user;
}
export function selectUsername(state) {
  return state.user.username;
}
export function selectChatBoxes(state) {
  return state.chatBoxes;
}

// console.log('state: ', store.getState());
