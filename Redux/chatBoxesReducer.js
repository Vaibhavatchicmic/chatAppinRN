import {messagesReducer} from './messagesReducer';
import {initalState} from './initalState';
import {createSlice} from '@reduxjs/toolkit';

export let chatId = 1000;

const chatBoxesSlice = createSlice({
  name: 'chatBoxes',
  initialState: initalState.chatBoxes.data,
  reducers: {
    fetched: (state, action) => {
      return action.payload.chatBoxes;
    },
    created: (state, action) => {
      state.push({
        name: action.payload.name,
        isGroup: action.payload.isGroup,
        id: action.payload.id || ++chatId,
        readTill: action.payload.time || Date.now(),
        IreadTill: action.payload.time || Date.now(),
        messages: [],
      });
    },
    deleted: (state, action) => {
      return state.filter(chatBox => {
        return chatBox.id !== action.payload.id;
      });
    },
  },
});

const chatBoxesReducer = chatBoxesSlice.reducer;
export {chatBoxesReducer};

export const {fetched, created, deleted} = chatBoxesSlice.actions;

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
