import {View, Text, FlatList, Pressable} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectChatBoxes} from '../../Redux/store';
import Styles from './Styles';
import RoundImage from '../Widgets/RoundImage';
import styles from '../Chat/Styles';

const ChatsList = ({navigation}) => {
  const chatBoxes = useSelector(selectChatBoxes);
  console.log(chatBoxes);
  return (
    <View style={{paddingHorizontal: 22, flex: 1}}>
      {/* heading */}
      <Text style={Styles.heading}>Chats</Text>
      {/* ChatBoxList */}
      <FlatList
        data={chatBoxes}
        renderItem={({item}) => {
          // console.log(item);
          return (
            <ChatsBoxElement
              name={item.Name}
              isGroup={item.isGroup}
              id={item.id}
              onPress={() => {
                navigation.navigate('Chats');
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
