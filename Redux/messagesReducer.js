import {initalState} from './initalState';

let mesId = 1000;

export function messagesReducer(state = initalState.user[0].messages, action) {
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
