import {messagesReducer} from './messagesReducer';
import {initalState} from './initalState';
import {createSlice} from '@reduxjs/toolkit';
import {action} from '@nozbe/watermelondb/decorators';

export let chatId = 1000;

const chatBoxes = {
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null, //'string'
  data: {
    //own id indexed
    125: {
      name: 'Global Group',
      isGroup: true,
      id: 125,
      readTill: Date.now(),
      IreadTill: Date.now(),
    },
    123: {
      name: 'Robert Fox',
      isGroup: false,
      id: 123,
      readTill: Date.now(),
      IreadTill: Date.now(),
    },
    124: {
      name: 'Esther Howard',
      isGroup: true,
      id: 124,
      readTill: Date.now(),
      IreadTill: Date.now(),
    },
  },
};

const chatBoxesSlice = createSlice({
  name: 'chatBoxes',
  initialState: chatBoxes,
  reducers: {
    // fetching all the groups
    fetched: (state, action) => {
      state.data = action.payload.chatBoxes;
      state.status = 'idle';
    },
    loading: (state, action) => {
      state.status = 'loading';
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
    // console.log(state.chatBoxes);
    // console.log('chatbox for ', id, state.chatBoxes.data[id]);
    return state.chatBoxes.data[id];
  };
}
export function selectChatBoxes(state) {
  return state.chatBoxes;
}
