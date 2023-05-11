import {messagesReducer} from './messagesReducer';
import {initalState} from './initalState';

export let chatId = 1000;

export function chatBoxesReducer(state = initalState.chatBoxes, action) {
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
export function selectChatBoxes(state) {
  return state.chatBoxes;
}
