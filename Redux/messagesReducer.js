import {act} from 'react-test-renderer';
import {initalState} from './initalState';
import {createSlice} from '@reduxjs/toolkit';
import {action} from '@nozbe/watermelondb/decorators';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {startWith} from '@nozbe/watermelondb/utils/rx';
import {selectCurrentChatBox} from './currentChatBoxReducer';
let mesId = 1000;

const messagesSlice = createSlice({
  name: 'messages',
  initialState: initalState.messages,
  reducers: {
    //messages of a spedific group
    fetched: (state, action) => {
      state.data[action.payload.chatBoxId] = action.payload.messages;
      state.status = 'idle';
    },
    loading: (state, action) => {
      state.status = 'loading';
    },
    fetched_inStart: (state, action) => {
      state.data[action.payload.chatBoxId] = [
        ...action.payload.messages,
        ...state.data[action.payload.chatBoxId],
      ];
      state.status = 'idle';
    },
    paginated_inStart: (state, action) => {
      let a = [];
      a.unshift(action.payload.messages);
      state.data[action.payload.chatBoxId] = [
        ...action.payload.messages,
        ...state.data[action.payload.chatBoxId],
      ];
    },
    init: (state, action) => {
      console.log('initiating messages for', action.payload.chatBoxId, state);
      state.data[action.payload.chatBoxId] = [];
    },
    added: (state, action) => {
      state.data[action.payload.chatBoxId] = [
        ...state.data[action.payload.chatBoxId],
        action.payload.message,
      ];
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

export function selectMessageLength(state) {
  return state.messages.data[state.currentChatBox].length;
}
export function selectMessageStatus(state) {
  return state.messages.status;
}

const LIMIT = 50;

export function fetchGroupMessages(GUID, conv_id) {
  return async (dispatch, getState) => {
    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(GUID)
      .setLimit(LIMIT)
      .build();

    const gMessages = [];
    try {
      dispatch({type: 'messages/loading'});
      const messages = await messagesRequest.fetchPrevious();

      dispatch({
        type: 'messages/fetched_inStart',
        payload: {
          messages: messages.map(message => message.rawMessage),
          chatBoxId: conv_id,
        },
      });
      console.log(
        'Message list fetched:',
        messages.map(m => m.rawMessage),
      );
    } catch (error) {
      console.log('Message fetching failed with error:', error);
    }
  };
}
export function paginationGroupMessages(GUID, conv_id, lastMesId) {
  return async (dispatch, getState) => {
    if (lastMesId === '1') {
      console.log('end reached');
    } else {
      let limit = LIMIT;
      let mesFrom = lastMesId;
      // if (lastMesId < 0) {
      //   console.log('no messages');
      //   return;
      // } else if (lastMesId - limit < 0) {
      //   mesFrom = 0;
      //   limit = lastMesId;
      // }
      var messagesRequest = new CometChat.MessagesRequestBuilder()
        .setGUID(GUID)
        .setMessageId(mesFrom)
        .setLimit(limit)
        .build();

      try {
        const messages = await messagesRequest.fetchPrevious();

        const mes = getState().messages.data[conv_id];
        for (let i = 0; i < mes.length; i++) {
          for (let j = 0; j < messages.length; j++) {
            if (mes[i].id === messages[j].id) {
              console.log('matched id', lastMesId);
              return;
            }
          }
        }
        console.log('in paging safe', lastMesId);
        dispatch({
          type: 'messages/paginated_inStart',
          payload: {
            messages: messages.map(message => message.rawMessage),
            chatBoxId: conv_id,
          },
        });
        // console.log(
        //   'Message list fetched in pagination:',
        //   messages.map(m => m.rawMessage),
        // );
        // console.log('doing pagination from ', lastMesId);
      } catch (error) {
        console.log('Message fetching failed with error:', error);
      }
    }
  };
}

//now it is for only groups
export function sendMessage(text, isGroup, receiverID, conv_id) {
  return async (dispatch, getState) => {
    let messageText = text;
    let receiverType = isGroup
      ? CometChat.RECEIVER_TYPE.GROUP
      : CometChat.RECEIVER_TYPE.USER;
    let textMessage = new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType,
    );

    CometChat.sendMessage(textMessage).then(
      message => {
        dispatch({
          type: 'messages/added',
          payload: {
            message: message.rawMessage,
            chatBoxId: conv_id,
          },
        });
        console.log('Message sent successfully:', message);
      },
      error => {
        console.log('Message sending failed with error:', error);
      },
    );
  };
}
