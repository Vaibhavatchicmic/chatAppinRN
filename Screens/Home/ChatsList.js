import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Styles from './Styles';
import styles from '../Chat/Styles';
import CallApi from '../../Utility/network';
import {ChatsBoxElement} from './ChatsBoxElement';
import {selectChatBoxes} from '../../Redux/chatBoxesReducer';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {fetchGroupMessages} from '../../Redux/messagesReducer';

const ChatsList = ({navigation}) => {
  const chatBoxes = useSelector(selectChatBoxes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(async (dispatch, getState) => {
      let limit = 30;
      let groupsRequest = new CometChat.GroupsRequestBuilder()
        .setLimit(limit)
        .joinedOnly(true)
        .build();
      const res = await groupsRequest.fetchNext();
      // console.log(res);
      dispatch({
        type: 'chatBoxes/fetched',
        payload: {
          chatBoxes: res.map(group => {
            return {
              name: group.name,
              isGroup: true,
              icon: group.icon,
              id: group.guid,
              conv_id: group.conversationId,
              // avatar: group.avatar,
              messages: [],
            };
          }),
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
  const isLoading = false;
  // console.log('in Chatlist:', chatBoxes);
  return (
    <View style={{paddingHorizontal: 22, flex: 1}}>
      {/* heading */}

      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#771F98" />
        </View>
      ) : (
        <>
          <Text style={Styles.heading}>Chats</Text>
          {/* ChatBoxList */}
          <FlatList
            data={chatBoxes}
            renderItem={({item}) => {
              // console.log(item);
              return (
                <ChatsBoxElement
                  name={item.name}
                  isGroup={item.isGroup}
                  id={item.id}
                  onPress={() => {
                    console.log('chatBox selected ', item.id);
                    dispatch({
                      type: 'currentChatBox/set',
                      payload: {
                        id: item.id,
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
