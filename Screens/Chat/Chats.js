import React from 'react';
import {Pressable, StatusBar, TextInput, View, Text} from 'react-native';
import BackButton from '../Widgets/BackButton';
import {Image} from 'react-native-svg';
import ClickIcon from '../Widgets/ClickIcon';
import Svg, {Path} from 'react-native-svg';
import ChatBox from './ChatBox';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import styles from './Styles';

export default function Chats({navigation}) {
  return (
    <View backgroundColor="white" style={{flex: 1}}>
      <ChatHeader
        onBack={() => {
          navigation.goBack();
        }}
      />
      <ChatBox />
      <View style={styles.dropShadow} />
      <ChatFooter />
    </View>
  );
}
