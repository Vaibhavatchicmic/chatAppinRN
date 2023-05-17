import {act} from 'react-test-renderer';
import {initalState} from './initalState';
import {createSlice} from '@reduxjs/toolkit';
import {action} from '@nozbe/watermelondb/decorators';
import {CometChat} from '@cometchat-pro/react-native-chat';
let mesId = 1000;

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initalState.messages,
  reducers: {
    //messages of a spedific group
    fetched: (state, action) => {
      state.data[action.payload.chatBoxId] = action.payload.messages;
    },
    init: (state, action) => {
      console.log('initiating messages for', action.payload.chatBoxId, state);
      state.data[action.payload.chatBoxId] = [];
    },
    added: (state, action) => {
      state.data[action.payload.chatBoxId] = {
        senderId: action.payload.senderId,
        time: action.payload.time || Date.now(),
        text: action.payload.text,
        id: action.payload.id || ++mesId,
      };
    },
    readByMe: state => state,
    deleted: (state, action) => {
      delete state.data[action.payload.chatBoxId][action.payload.id];
    },
    edited: (state, action) => {
      state.data[action.payload.chatBoxId][action.payload.id].text =
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
    return state.messages.data[id];
  };
}

export async function fetchGroupMessages(GUID, conv_id) {
  return async (dispatch, getState) => {
    let limit = 30;
    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(GUID)
      .setLimit(limit)
      .build();

    const gMessages = [];
    messagesRequest.fetchPrevious().then(
      messages => {
        messages.forEach(message => {
          dispatch({type: ''});
        });
        console.log('Message list fetched:', messages);
      },
      error => {
        console.log('Message fetching failed with error:', error);
      },
    );
  };
  // let GUID = 'GUID';
}
