import {View, Text, FlatList, ActivityIndicator, Button} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Styles from './Styles';
import styles from '../Chat/Styles';
import CallApi from '../../Utility/network';
import {ChatsBoxElement} from './ChatsBoxElement';
import {selectChatBoxes} from '../../Redux/chatBoxesReducer';
import {CometChat} from '@cometchat-pro/react-native-chat';
import MyActivityIndicator from '../Widgets/MyActivityIndicator';
import {
  db_createGroupMessages,
  db_readGroupMessages,
} from '../../database.native';

let mesId = 1;

const ChatsList = ({navigation}) => {
  const chatBoxes = useSelector(selectChatBoxes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(async (dispatch, getState) => {
      let limit = 30;
      let groupsRequest = new CometChat.GroupsRequestBuilder()
        .setLimit(limit)
        .build();

      dispatch({type: 'chatBoxes/loading'});
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
          chatBoxes,
        },
      });
      res.forEach(element => {
        console.log(element);
        dispatch({
          type: 'messages/init',
          payload: {
            chatBoxId: element.conversationId,
          },
        });
      });
    });
  }, []);
  const isLoading = chatBoxes.status === 'loading';
  const chatBoxesData = Object.values(chatBoxes.data);
  // console.log('in Chatlist:', chatBoxes);
  return (
    <View style={{flex: 1}}>
      {/* heading */}

      {isLoading ? (
        <MyActivityIndicator />
      ) : (
        <>
          {/* ChatBoxList */}
          {/* <Button title="clickme" onPress={() => db_readGroupMessages('1')} />
          <Button
            title="clickme2"
            onPress={() =>
              db_createGroupMessages('abcdef', '1', '1', ++mesId, '1')
            }
          /> */}
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
        </>
      )}
    </View>
  );
};

export default ChatsList;
