import {messagesReducer} from './messagesReducer';
import {initalState} from './initalState';
import {createSlice} from '@reduxjs/toolkit';
import {action} from '@nozbe/watermelondb/decorators';
import {CometChat} from '@cometchat-pro/react-native-chat';

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
