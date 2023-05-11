import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Styles from './Styles';
import RoundImage from '../Widgets/RoundImage';

export function ChatsBoxElement({name, isGroup, id, onPress}) {
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
