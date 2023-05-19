import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useContext, useEffect, useMemo} from 'react';
import Svg, {Path} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {ChatBoxContext} from './context';
import CallApi from '../../Utility/network';
import {selectCurrentUser} from '../../Redux/userReducer';
import {getChatBoxbyId} from '../../Redux/chatBoxesReducer';
import {selectCurrentChatBox} from '../../Redux/currentChatBoxReducer';
import {
  fetchGroupMessages,
  getMessagesByGroupId,
  paginationGroupMessages,
  selectMessageStatus,
} from '../../Redux/messagesReducer';
import MyActivityIndicator from '../Widgets/MyActivityIndicator';

function TimeStamp(time) {
  const date = new Date(time * 1000);
  // console.log(typeof time);
  return `${date.getHours()}:${date.getMinutes()}`;
}
function DateStamp(time) {
  const date = new Date(time * 1000);
  const now = new Date();
  if (date.getFullYear() !== now.getFullYear()) {
    return date.toDateString();
  } else if (date.getMonth() !== now.getMonth()) {
    return date.toDateString();
  } else if (date.getDate() === now.getDate() - 1) {
    return 'Yesterday';
  } else if (date.getDate() === now.getDate()) {
    return 'Today';
  } else return date.toDateString();
}
function isDiffDates(time1, time2) {
  const date1 = new Date(time1 * 1000);
  const date2 = new Date(time2 * 1000);
  let isDif = false;
  if (date1.getFullYear() !== date2.getFullYear()) {
    isDif = true;
  } else if (date1.getMonth() !== date2.getMonth()) {
    isDif = true;
  }
  isDif = date1.getDate() !== date2.getDate();
  // console.log(date1, date2, isDif);

  return isDif;
}
function isSameTime(time1, time2) {
  if (isDiffDates(time1, time2)) {
    return false;
  } else {
    return TimeStamp(time1) === TimeStamp(time2);
  }
}

export default function ChatBox({ScrollViewRef}) {
  const user = useSelector(selectCurrentUser);
  const chatBox = useSelector(
    getChatBoxbyId(useSelector(selectCurrentChatBox)),
  );
  const messages = useSelector(getMessagesByGroupId(chatBox.conv_id));
  const dispatch = useDispatch();
  // console.log('messages:', messages);
  useEffect(() => {
    if (messages.length === 0) {
      dispatch(fetchGroupMessages(chatBox.id, chatBox.conv_id));
    }
    console.log(chatBox.conv_id, 'chatBoxLoaded');
  }, []);
  const isLoading = useSelector(selectMessageStatus) === 'loading';
  let inverted_messages = [...messages];
  inverted_messages.reverse();
  for (let i = 0; i < inverted_messages.length - 1; i++) {
    inverted_messages[i] = {
      ...inverted_messages[i],
      isnewDate: isDiffDates(
        inverted_messages[i]?.sentAt,
        inverted_messages[i + 1]?.sentAt,
      ),
      SenderSameAsPrevious:
        inverted_messages[i].sender === inverted_messages[i + 1].sender,
      // TimeSameAsPrevious: isSameTime(
      //   inverted_messages[i].sentAt,
      //   inverted_messages[i + 1].sentAt,
      // ),
    };
  }
  // for (let i = inverted_messages.length; i > 0; i--) {
  //   inverted_messages[i] = {
  //     ...inverted_messages[i],
  //     TimeSameAsNext: isSameTime(
  //       inverted_messages[i].sentAt,
  //       inverted_messages[i + 1].sentAt,
  //     ),
  //   };
  // }
  inverted_messages[inverted_messages.length - 1] = {
    ...inverted_messages[inverted_messages.length - 1],
    isnewDate: true,
  };
  return (
    <View style={{flex: 1}}>
      {/* <Button
        title="Click me"
        onPress={() => {
          dispatch(
            paginationGroupMessages(
              chatBox.id,
              chatBox.conv_id,
              messages[0].id,
            ),
          );
        }}
      /> */}
      {isLoading ? (
        <MyActivityIndicator />
      ) : (
        <FlatList
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          bounces={false}
          onEndReachedThreshold={0.5}
          overScrollMode="never"
          scrollToOverflowEnabled={false}
          keyExtractor={item => item.id}
          onEndReached={() => {
            dispatch(paginationGroupMessages(chatBox.id, chatBox.conv_id));
          }}
          style={{paddingHorizontal: 20}}
          ref={ScrollViewRef}
          data={inverted_messages}
          inverted={true}
          renderItem={({item, index}) => {
            // console.log('inside renderItem', item.id);
            const mes = item;

            return (
              <View>
                {mes.isnewDate && <ChatNewDate text={DateStamp(mes.sentAt)} />}
                {mes.type === 'text' && (
                  <ChatText
                    text={mes.data.text}
                    me={user.id === mes.sender}
                    time={mes.sentAt}
                    isread={chatBox.readTill >= mes.time}
                    key={mes.id}
                    sender={mes.data.entities.sender.entity.name}
                    SSAP={!mes.isnewDate && mes.SenderSameAsPrevious}
                    // TSAP={mes.TimeSameAsPrevious}
                  />
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

function ChatText({text, me, time, isread, sender, SSAP, TSAP}) {
  return (
    <View>
      {!me && !SSAP && <Text style={styles.senderName}>{sender}</Text>}
      <Text
        style={[
          styles.Text,
          styles.ChatText,
          me ? styles.ChatTextMy : styles.ChatTextOther,
          // SSAP && {borderRadius: 10},
        ]}>
        {text}
        {/* <Text style={[styles.Text, styles.Text_small, {alignSelf: 'flex-end'}]}>
          {TimeStamp(time)} {me && isread && <ReadIcon />}
        </Text> */}
      </Text>
      <View
        style={[
          styles.ChatTime,
          me ? styles.ChatTimeMy : styles.ChatTimeOther,
        ]}>
        <Text style={[styles.Text, styles.Text_small]}>
          {TimeStamp(time)} {me && isread && <ReadIcon />}
        </Text>
      </View>
    </View>
  );
}
function ReadIcon() {
  return (
    <View>
      <Svg
        style={styles.isread_icon}
        xmlns="http://www.w3.org/2000/svg"
        width={15}
        height={15}
        fill="none">
        <Path
          fill="#7EBD4C"
          d="M6.069 7.056a.628.628 0 1 0-.888.888l1.875 1.875A.625.625 0 0 0 7.5 10a.626.626 0 0 0 .45-.212l4.375-5a.625.625 0 0 0-.938-.825L7.5 8.463 6.069 7.056Z"
        />
        <Path
          fill="#7EBD4C"
          d="M13.125 6.875a.625.625 0 0 0-.625.625 5 5 0 1 1-8.544-3.525A4.956 4.956 0 0 1 7.5 2.5c.4.002.798.049 1.188.138a.625.625 0 1 0 .293-1.213A6.588 6.588 0 0 0 7.5 1.25a6.25 6.25 0 0 0-4.375 10.681A6.206 6.206 0 0 0 7.5 13.75a6.25 6.25 0 0 0 6.25-6.25.625.625 0 0 0-.625-.625Z"
        />
      </Svg>
    </View>
  );
}
function ChatNewDate({text}) {
  return (
    <View
      style={[styles.flexRow, {paddingVertical: 30, paddingHorizontal: 30}]}>
      <View style={styles.Horizontal_Line} />
      <Text style={styles.Text}>{text}</Text>
      <View style={styles.Horizontal_Line} />
    </View>
  );
}
const styles = StyleSheet.create({
  Text: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 400,
  },
  Text_small: {
    fontSize: 12,
    // position: 'absolute',
  },
  flexRow: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  ChatTextMy: {
    backgroundColor: '#771F98',
    marginLeft: 'auto',
    color: 'white',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  Horizontal_Line: {
    top: 10,
    flex: 1,
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 15,
  },
  ChatTimeMy: {
    marginLeft: 'auto',
  },
  ChatTextOther: {
    marginRight: 'auto',
    borderWidth: 2,
    borderColor: '#771F98',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  ChatTime: {
    backgroundColor: '#F1F1F1',
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 7,
  },
  ChatTimeOther: {
    marginRight: 'auto',
  },
  ChatText: {
    marginVertical: 2,
    maxWidth: 250,
    minWidth: 70,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderRadius: 5,
    lineHeight: 21,
  },

  isread_icon: {
    // marginTop: 5,
    top: 3,
    // position: 'relative',
  },
  senderName: {
    fontFamily: 'Poppins',
    color: '#771F98',
    marginTop: 20,
    fontSize: 15,
    fontWeight: '700',
  },
});
