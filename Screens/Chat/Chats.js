import React, {createContext, memo, useRef} from 'react';
import {Pressable, StatusBar, TextInput, View, Text} from 'react-native';
import BackButton from '../Widgets/BackButton';
import {Image} from 'react-native-svg';
import ClickIcon from '../Widgets/ClickIcon';
import Svg, {Path} from 'react-native-svg';
import ChatBox from './ChatBox';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import styles from './Styles';
import {create} from 'react-test-renderer';
import {useSelector} from 'react-redux';
import {ChatBoxContext} from './context';
import {getChatBoxbyId} from '../../Redux/chatBoxesReducer';

export default memo(function Chats({navigation, route}) {
  const chatBoxId = route.params.chatBoxId;
  const chatBox = useSelector(getChatBoxbyId(chatBoxId));
  // console.log('chatBox', chatBox);
  const ScrollViewRef = useRef(null);
  return (
    <ChatBoxContext.Provider value={chatBox}>
      <View backgroundColor="white" style={{flex: 1}}>
        <ChatHeader
          onBack={() => {
            navigation.goBack();
          }}
        />
        <ChatBox ScrollViewRef={ScrollViewRef} />
        <ChatFooter ScrollViewRef={ScrollViewRef} />
      </View>
    </ChatBoxContext.Provider>
  );
});
