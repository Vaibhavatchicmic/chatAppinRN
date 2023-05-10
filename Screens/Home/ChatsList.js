import {View, Text, FlatList, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectChatBoxes} from '../../Redux/store';
import Styles from './Styles';
import RoundImage from '../Widgets/RoundImage';
import styles from '../Chat/Styles';
import CallApi from '../../Utility/network';

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
  // console.log('in Chatlist:', chatBoxes);
  return (
    <View style={{paddingHorizontal: 22, flex: 1}}>
      {/* heading */}
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
    </View>
  );
};

function ChatsBoxElement({name, isGroup, id, onPress}) {
  return (
    <Pressable
      style={[Styles.flexRow, Styles.ChatBoxElement]}
      onPress={onPress}>
      {/* round image */}
      <RoundImage isGroup={isGroup} />

      {/* Chatbox name and current message with not read */}
      <View style={[Styles.flexRow, Styles.jus_bet, {flex: 1}]}>
        {/* name and current message */}
        <View style={[Styles.flexCol, Styles.jus_bet, {marginVertical: 2}]}>
          <Text style={Styles.Text1}>{name}</Text>
          <Text style={Styles.Text2}>Hey, Let's play basketball</Text>
        </View>
        {/* last message time and not read */}
        <View style={[Styles.flexCol, Styles.jus_bet, {alignItems: 'center'}]}>
          <Text style={Styles.Text3}>15.43</Text>
          <View style={Styles.not_read}>
            <Text style={Styles.not_read_text}>2</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
export default ChatsList;
