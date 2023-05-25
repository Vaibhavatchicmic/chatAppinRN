import {act} from 'react-test-renderer';
import {initalState} from './initalState';
import {createSlice} from '@reduxjs/toolkit';
import {action} from '@nozbe/watermelondb/decorators';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {startWith} from '@nozbe/watermelondb/utils/rx';
import {selectCurrentChatBox} from './currentChatBoxReducer';
import {db_createGroupMessages} from '../database.native';
import {Alert} from 'react-native';
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
    failed: (state, action) => {
      state.status = 'failed';
    },
    loadingAgain: (state, action) => {
      state.status = 'loadingAgain';
    },
    failed2: (state, action) => {
      state.status = 'idle';
    },
    //for lot of messages
    fetched_inStart: (state, action) => {
      state.data[action.payload.chatBoxId] = [
        ...action.payload.messages,
        ...state.data[action.payload.chatBoxId],
      ];
      state.status = 'idle';
    },
    fetched_inEnd: (state, action) => {
      state.data[action.payload.chatBoxId] = [
        ...state.data[action.payload.chatBoxId],
        ...action.payload.messages,
      ];
      state.status = 'idle';
    },
    // for lot of messages
    paginated_inStart: (state, action) => {
      state.data[action.payload.chatBoxId] = [
        ...action.payload.messages,
        ...state.data[action.payload.chatBoxId],
      ];
      state.status = 'idle';
    },
    init: (state, action) => {
      // console.log('initiating messages for', action.payload.chatBoxId, state);
      state.data[action.payload.chatBoxId] = [];
    },
    //for one message
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

//when open chatBox first time
export function fetchGroupMessages(GUID, conv_id) {
  return async (dispatch, getState) => {
    // messagesFromDB=

    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(GUID)
      .setLimit(LIMIT)
      .build();

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
      //now saving messages to db
      messages.map(message => {
        db_createGroupMessages(
          JSON.stringify(message.rawMessage),
          message.rawMessage.sender,
          message.rawMessage.sentAt,
          +message.rawMessage.id,
          conv_id,
        );
      });
    } catch (error) {
      dispatch({type: 'messages/failed'});
      if (error.message) {
        Alert.alert(error.code, error.message);
      }

      console.log('Message fetching failed with error:', error);
    }
  };
}
export function paginationGroupMessages(GUID, conv_id) {
  return async (dispatch, getState) => {
    let lastMesId = getState().messages.data[conv_id][0].id;
    console.log('lastMesId', lastMesId);
    if (lastMesId == '0') {
      console.log('end reached'); //not work not 0 or 1 for every group
      return;
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
        dispatch({type: 'messages/loadingAgain'});
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
        //now saving messages to db
        messages.map(message => {
          db_createGroupMessages(
            JSON.stringify(message.rawMessage),
            message.rawMessage.sender,
            message.rawMessage.sentAt,
            +message.rawMessage.id,
            conv_id,
          );
        });
      } catch (error) {
        dispatch({type: 'messages/failed2'});
        if (error.message) {
          Alert.alert(error.code, error.message);
        }

        console.log('Message fetching failed with error:', error);
      }
    }
  };
}

//to load messages after some message (when user open app after lot of days)
export function nextGroupMessages(GUID, conv_id) {
  const limit = 100;
  return async (dispatch, getState) => {
    const len = getState().messages.data[conv_id].length;
    let latestMesId = getState().messages.data[conv_id][len - 1].id;
    let messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(GUID)
      .setMessageId(latestMesId)
      .setLimit(limit)
      .build();

    try {
      dispatch({type: 'messages/loadingAgain'});
      const messages = await messagesRequest.fetchNext();

      dispatch({
        type: 'messages/fetched_inEnd',
        payload: {
          messages: messages.map(message => message.rawMessage),
          chatBoxId: conv_id,
        },
      });
      //now saving messages to db
      messages.map(message => {
        db_createGroupMessages(
          JSON.stringify(message.rawMessage),
          message.rawMessage.sender,
          message.rawMessage.sentAt,
          +message.rawMessage.id,
          conv_id,
        );
      });
      console.log('found ', messages.length, ' messages');
      if (messages.length === 100) {
        dispatch(nextGroupMessages(GUID, conv_id));
      }
    } catch (error) {
      dispatch({type: 'messages/failed2'});
      if (error.message) {
        Alert.alert(error.code, error.message);
      }

      console.log('Message fetching failed with error:', error);
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
        // now also save to db
        db_createGroupMessages(
          JSON.stringify(message.rawMessage),
          message.rawMessage.sender,
          message.rawMessage.sentAt,
          +message.rawMessage.id,
          conv_id,
        );
      },
      error => {
        console.log('Message sending failed with error:', error);
      },
    );
  };
}
