import {act} from 'react-test-renderer';
import {initalState} from './initalState';
import {createSlice} from '@reduxjs/toolkit';
let mesId = 1000;

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initalState.messages.data,
  reducers: {
    //messages of a spedific group
    fetched: (state, action) => {
      return (state[action.payload.chatBoxId] = action.payload.messages);
    },
    added: (state, action) => {
      state[action.payload.chatBoxId] = {
        senderId: action.payload.senderId,
        time: action.payload.time || Date.now(),
        text: action.payload.text,
        id: action.payload.id || ++mesId,
      };
    },
    readByMe: state => state,
    deleted: (state, action) => {
      delete state[action.payload.chatBoxId][action.payload.id];
    },
    edited: (state, action) => {
      state[action.payload.chatBoxId][action.payload.id].text =
        action.payload.text;
    },
  },
});

const messagesReducer = messagesSlice.reducer;

export {messagesReducer};

export const {fetched, added, readByMe, deleted, edited} =
  messagesSlice.actions;

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
