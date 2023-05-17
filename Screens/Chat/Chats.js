import React, {memo, useRef} from 'react';
import ChatBox from './ChatBox';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import {View} from 'react-native';

export default memo(function Chats({navigation}) {
  // const chatBox = [];
  // console.log('chatBox', chatBox);
  const ScrollViewRef = useRef(null);
  return (
    <View backgroundColor="white" style={{flex: 1}}>
      <ChatHeader
        onBack={() => {
          navigation.goBack();
        }}
      />
      <ChatBox ScrollViewRef={ScrollViewRef} />
      <ChatFooter ScrollViewRef={ScrollViewRef} />
    </View>
  );
});
