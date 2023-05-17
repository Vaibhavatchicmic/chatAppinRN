import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Styles from './Styles';
import styles from '../Chat/Styles';
import CallApi from '../../Utility/network';
import {ChatsBoxElement} from './ChatsBoxElement';
import {selectChatBoxes} from '../../Redux/chatBoxesReducer';

const ChatsList = ({navigation}) => {
  const chatBoxes = useSelector(selectChatBoxes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(async (dispatch, getState) => {
      const res = await CallApi('groups', 'GET');
      console.log(res);
      dispatch({
        type: 'chatBoxes/read',
        payload: {
          chatBoxes: res.data.map(group => {
            return {
              name: group.name,
              isGroup: true,
              icon: group.icon,
              id: group.guid,
              // avatar: group.avatar,
              messages: [],
            };
          }),
        },
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
              console.log(item);
              return (
                <ChatsBoxElement
                  name={item.name}
                  isGroup={item.isGroup}
                  id={item.id}
                  onPress={() => {
                    navigation.navigate('Chats', {chatBoxId: item.id});
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
