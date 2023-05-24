import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Styles from './Styles';
import styles from '../Chat/Styles';
import CallApi from '../../Utility/network';
import {ChatsBoxElement} from './ChatsBoxElement';
import {fetchGroups, selectChatBoxes} from '../../Redux/chatBoxesReducer';
import {CometChat} from '@cometchat-pro/react-native-chat';
import MyActivityIndicator from '../Widgets/MyActivityIndicator';
import {
  db_clearGroups,
  db_createGroup,
  db_createGroupMessages,
  db_readGroupMessages,
  db_readGroups,
} from '../../database.native';
import Loading from '../Widgets/Loading';
import {err} from 'react-native-svg/lib/typescript/xml';

let mesId = 1;

const ChatsList = ({navigation, filterValue}) => {
  const chatBoxes = useSelector(selectChatBoxes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(async (dispatch, getState) => {
      let chatsFromDB = await db_readGroups();
      chatsFromDB = chatsFromDB.map(chat => JSON.parse(chat.name));
      console.log('chatFrom db:', chatsFromDB);
      let chatBoxes_DB = {};
      chatsFromDB.forEach(group => {
        chatBoxes_DB[group.conversationId] = {
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
        type: 'chatBoxes/fetchedFromDB',
        payload: {
          chatBoxes: chatBoxes_DB,
        },
      });
      chatsFromDB.forEach(element => {
        console.log(element);
        dispatch({
          type: 'messages/init',
          payload: {
            chatBoxId: element.conversationId,
          },
        });
      });
      dispatch(fetchGroups());
      // let limit = 30;
      // let groupsRequest = new CometChat.GroupsRequestBuilder()
      //   .setLimit(limit)
      //   .build();

      // dispatch({type: 'chatBoxes/loading'});
      // try {
      //   const res = await groupsRequest.fetchNext();
      //   // console.log(res);
      //   const chatBoxes = {};
      //   res.forEach(group => {
      //     console.log('conv_id:', group.conversationId);
      //     chatBoxes[group.conversationId] = {
      //       name: group.name,
      //       isGroup: true,
      //       icon: group.icon,
      //       id: group.guid,
      //       conv_id: group.conversationId,
      //       isMember: group.hasJoined,
      //       // avatar: group.avatar,
      //     };
      //   });
      //   dispatch({
      //     type: 'chatBoxes/fetched',
      //     payload: {
      //       chatBoxes: chatBoxes,
      //     },
      //   });
      //   await db_clearGroups();
      //   for (let group of res) {
      //     await db_createGroup(JSON.stringify(group));
      //   }

      //   res.forEach(element => {
      //     console.log(element);
      //     dispatch({
      //       type: 'messages/init',
      //       payload: {
      //         chatBoxId: element.conversationId,
      //       },
      //     });
      //   });
      // } catch (error) {
      //   if (error.message) {
      //     dispatch({type: 'chatBoxes/failed'});
      //     Alert.alert(error.code, error.message);
      //   }
      //   console.log(error);
      // }
    });
  }, []);
  const isLoading = chatBoxes.status === 'loading';
  let chatBoxesData = Object.values(chatBoxes.data);
  if (filterValue) {
    chatBoxesData = chatBoxesData.filter(chatBox => {
      return chatBox.name.includes(filterValue);
    });
  }
  // console.log('in Chatlist:', chatBoxes);
  return (
    <View style={{flex: 1}}>
      {/* heading */}
      {isLoading && <Loading />}

      {/* {isLoading ? (
        <MyActivityIndicator />
      ) : (
        <> */}
      {/* ChatBoxList */}
      {/* <Button title="clickme" onPress={() => db_readGroups()} /> */}
      <FlatList
        style={{paddingHorizontal: 22}}
        data={chatBoxesData}
        ListHeaderComponent={<Text style={[Styles.heading]}>Chats</Text>}
        overScrollMode="never"
        renderItem={({item}) => {
          // console.log(item);
          return (
            <ChatsBoxElement
              name={item.name}
              isGroup={item.isGroup}
              id={item.id}
              onPress={() => {
                // console.log('chatBox selected ', item.id);
                dispatch({
                  type: 'currentChatBox/set',
                  payload: {
                    id: item.conv_id,
                  },
                });
                navigation.navigate('Chats');
              }}
            />
          );
        }}
      />
      {/* </>
      )} */}
    </View>
  );
};

export default ChatsList;
