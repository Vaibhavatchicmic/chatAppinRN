import {messagesReducer} from './messagesReducer';
import {initalState} from './initalState';
import {createSlice} from '@reduxjs/toolkit';
import {action} from '@nozbe/watermelondb/decorators';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {db_clearGroups, db_createGroup} from '../database.native';
import {Alert} from 'react-native';

export let chatId = 1000;

const INITchatBoxes = {
  status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed',
  error: null, //'string'
  data: {},
};

const chatBoxesSlice = createSlice({
  name: 'chatBoxes',
  initialState: INITchatBoxes,
  reducers: {
    // fetching all the groups
    fetched: (state, action) => {
      state.data = action.payload.chatBoxes;
      state.status = 'idle';
    },
    failed: (state, action) => {
      state.status = 'idle';
    },
    fetchedFromDB: (state, action) => {
      state.data = action.payload.chatBoxes;
      state.status = 'idle';
    },
    loading: (state, action) => {
      state.status = 'loading';
    },
    //not correct
    created: (state, action) => {
      state.push(action.payload.chatBox);
    },
    deleted: (state, action) => {
      return state.filter(chatBox => {
        return chatBox.id !== action.payload.id;
      });
    },
    joined: (state, action) => {
      state.data[action.payload.guid].isMember = true;
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

export function fetchGroups() {
  return async (dispatch, getState) => {
    let limit = 30;
    let groupsRequest = new CometChat.GroupsRequestBuilder()
      .setLimit(limit)
      .build();

    dispatch({type: 'chatBoxes/loading'});
    try {
      const res = await groupsRequest.fetchNext();
      // console.log(res);
      const chatBoxes = {};
      res.forEach(group => {
        console.log('conv_id:', group.conversationId);
        chatBoxes[group.conversationId] = {
          name: group.name,
          isGroup: true,
          icon: group.icon,
          id: group.guid,
          conv_id: group.conversationId,
          isMember: group.hasJoined,
          // avatar: group.avatar,
        };
      });
      dispatch({
        type: 'chatBoxes/fetched',
        payload: {
          chatBoxes: chatBoxes,
        },
      });
      await db_clearGroups();
      for (let group of res) {
        await db_createGroup(JSON.stringify(group));
      }

      res.forEach(element => {
        console.log(element);
        dispatch({
          type: 'messages/init',
          payload: {
            chatBoxId: element.conversationId,
          },
        });
      });
    } catch (error) {
      if (error.message) {
        dispatch({type: 'chatBoxes/failed'});
        Alert.alert(error.code, error.message);
      }
      console.log(error);
    }
  };
}

// create a group with the logged in user as admin
export function createGroup(
  GUID,
  groupName,
  onSuccess = () => {},
  onFail = () => {},
) {
  return async (dispatch, getState) => {
    console.log('creating group of guid:', GUID, ' name: ', groupName);
    const UID = getState().user.id;
    let groupType = CometChat.GROUP_TYPE.PUBLIC;

    let group = new CometChat.Group(GUID, groupName, groupType);
    let members = [
      new CometChat.GroupMember(UID, CometChat.GROUP_MEMBER_SCOPE.ADMIN),
    ];
    let banMembers = [];

    CometChat.createGroupWithMembers(group, members, banMembers).then(
      response => {
        console.log('Group created successfully', response);
        // create new group
        dispatch({
          type: '',
          payload: {
            name: group.name,
            isGroup: true,
            icon: group.icon,
            id: group.guid,
            conv_id: group.conversationId,
            isMember: group.hasJoined,
            // avatar: group.avatar,
          },
        });
        onSuccess();
      },
      error => {
        console.log('Some error occured while creating group', error);
        onFail();
      },
    );
  };
}
