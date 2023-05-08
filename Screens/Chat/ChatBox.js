import {ScrollView, View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import Svg, {Path, Use} from 'react-native-svg';
import {
  selectMessages,
  selectUsername,
  selelectReadTill,
  store,
} from '../../Redux/store';
import {useSelector} from 'react-redux';

function TimeStamp(time) {
  const date = new Date(time);
  return `${date.getHours()}:${date.getMinutes()}`;
}

export default function ChatBox({ScrollViewRef}) {
  const messages = useSelector(selectMessages);
  const readTill = useSelector(selelectReadTill);
  const Username = useSelector(selectUsername);
  // console.log(messages);
  return (
    <View style={{flex: 1}}>
      {/* <ScrollView style={{paddingHorizontal: 20}} ref={ScrollViewRef}>
        <ChatNewDay text={'Today'} />
        {messages.map(mes => (
          <ChatText
            text={mes.text}
            me={Username === mes.sender}
            time={TimeStamp(mes.time)}
            isread={mes.time <= readTill}
            key={mes.id}
          />
        ))}
      </ScrollView> */}
      <FlatList
        ref={ScrollViewRef}
        data={messages}
        renderItem={({item}) => {
          const mes = item;
          console.log(mes);
          // return <Text>hello</Text>;
          return (
            <ChatText
              text={mes.text}
              me={Username === mes.sender}
              time={TimeStamp(mes.time)}
              isread={mes.time <= readTill}
              key={mes.id}
            />
          );
        }}
      />
    </View>
  );
}

function ChatText({text, me, time = '14:12', isread}) {
  return (
    <View>
      <Text
        style={[
          styles.Text,
          styles.ChatText,
          me ? styles.ChatTextMy : styles.ChatTextOther,
        ]}>
        {text}
      </Text>
      <View
        style={[
          styles.ChatTime,
          me ? styles.ChatTimeMy : styles.ChatTimeOther,
        ]}>
        <Text style={[styles.Text, styles.Text_small]}>
          {time} {me && isread && <ReadIcon />}
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
function ChatNewDay({text}) {
  return (
    <View style={[styles.flexRow, {paddingBottom: 30, paddingHorizontal: 20}]}>
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
  },
  Horizontal_Line: {
    top: 10,
    width: 100,
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
  },
  ChatTime: {
    backgroundColor: '#F1F1F1',
    marginBottom: 20,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 7,
  },
  ChatTimeOther: {
    marginRight: 'auto',
  },
  ChatText: {
    maxWidth: 250,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    lineHeight: 21,
  },

  isread_icon: {
    // marginTop: 5,
    top: 3,
    // position: 'relative',
  },
});
