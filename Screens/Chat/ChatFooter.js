import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useContext, useState} from 'react';
import BackButton from '../Widgets/BackButton';
import {Svg, Path} from 'react-native-svg';
import ClickIcon from '../Widgets/ClickIcon';
import styles from './Styles';
import {useDispatch, useSelector} from 'react-redux';
import {ChatBoxContext} from './context';
import {selectCurrentUser} from '../../Redux/store';
import CallApi from '../../Utility/network';

function ChatFooter({ScrollViewRef}) {
  const chatBox = useContext(ChatBoxContext);
  const user = useSelector(selectCurrentUser);
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  function handleAddMessage(text) {
    dispatch(async (dispatch, getState) => {
      const res = await CallApi(
        'messages',
        'POST',
        {
          receiver: chatBox.id,
          receiverType: 'group',
          data: {text: input},
        },
        {onBehalfOf: user.id},
      );
      console.log(res);
      if (res.data) {
        dispatch({
          type: 'chatBoxes/messages/added',
          payload: {
            senderId: user.id,
            time: res.data.sentAt,
          },
        });
      }
    });
    dispatch({
      type: 'chatBoxes/messages/added',
      payload: {
        senderId: user.id,
        text: input,
        chatBoxId: chatBox.id,
      },
    });
    setInput('');
    // ScrollViewRef.current.scrollToEnd({animated: true});
  }

  const isTyping = input !== '';
  return (
    <View style={styles.ChatFooter}>
      <TextInput
        // onKeyPress={({nativeEvent: {key: typeKey}}) => {
        //   console.log(typeKey);
        // }}
        onChange={({nativeEvent: {eventCount, target, text}}) => {
          setInput(text);
          // console.log(text);
        }}
        value={input}
        placeholder="Type here..."
        multiline={true}
        style={styles.ChatInput}
      />

      {/* may icons */}
      {!isTyping && (
        <View style={styles.icons}>
          <ClickIcon>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              fill="none">
              <Path
                fill="#8D8D8D"
                d="M16.647.498c.73.326 1.245.913 1.708 1.774l.152.298.565 1.216.019.034.017.03.048.074c.257.315.688.505.973.505 2.606 0 4.734 2.297 4.865 5.185l.006.281v8.131c0 3.75-2.638 6.81-5.943 6.968l-.27.006H6.214C2.872 25 .147 22.04.006 18.329L0 18.026v-8.13c0-3.02 2.181-5.467 4.871-5.467.284 0 .715-.19.973-.505l.01-.012.01-.016.065-.111.563-1.215C6.995 1.545 7.542.86 8.352.498c1.487-.664 6.81-.664 8.295 0ZM9.045 2.453c-.276.124-.527.41-.794.906l-.116.226-.481 1.044-.118.24c-.1.185-.198.34-.311.479-.576.702-1.402 1.107-2.136 1.175l-.218.01-.205.008c-1.491.114-2.683 1.451-2.784 3.124l-.007.23v8.131c0 2.6 1.815 4.723 4.1 4.862l.238.007h12.575c2.314 0 4.207-2.037 4.33-4.601l.007-.268v-8.13c0-1.78-1.232-3.236-2.791-3.355l-.205-.007-.218-.01c-.736-.069-1.562-.474-2.137-1.177a2.923 2.923 0 0 1-.308-.474l-.023-.046-.028-.056-.146-.305-.404-.88c-.274-.558-.524-.899-.794-1.07l-.118-.063-.149-.056c-1.286-.408-5.761-.39-6.759.056ZM12.5 8.698c2.712 0 4.91 2.468 4.91 5.513s-2.198 5.513-4.91 5.513c-2.713 0-4.912-2.468-4.912-5.513S9.787 8.698 12.5 8.698Zm0 2.105c-1.678 0-3.037 1.525-3.037 3.408s1.36 3.408 3.037 3.408c1.677 0 3.036-1.525 3.036-3.408s-1.36-3.408-3.036-3.408Zm6.88-3.086c.69 0 1.25.629 1.25 1.404 0 .72-.482 1.312-1.104 1.393l-.146.01c-.701 0-1.26-.629-1.26-1.403 0-.72.482-1.313 1.103-1.394l.157-.01Z"
              />
            </Svg>
          </ClickIcon>
          <ClickIcon>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={25}
              fill="none">
              <Path
                fill="#8D8D8D"
                fillRule="evenodd"
                d="M17.918 0C22.154 0 25 2.973 25 7.395v10.21C25 22.027 22.154 25 17.916 25H7.081C2.845 25 0 22.027 0 17.605V7.395C0 2.973 2.845 0 7.081 0h10.836Zm0 1.875H7.08c-3.162 0-5.206 2.166-5.206 5.52v10.21c0 3.354 2.044 5.52 5.206 5.52h10.835c3.164 0 5.209-2.166 5.209-5.52V7.395c0-3.354-2.045-5.52-5.207-5.52Zm-.483 9.392a1.249 1.249 0 1 1 0 2.5 1.254 1.254 0 0 1-1.256-1.25c0-.691.554-1.25 1.244-1.25h.012Zm-5.012 0a1.249 1.249 0 1 1 0 2.5 1.253 1.253 0 0 1-1.255-1.25c0-.691.553-1.25 1.244-1.25h.011Zm-5.01 0a1.249 1.249 0 1 1 0 2.5 1.254 1.254 0 0 1-1.257-1.25c0-.691.554-1.25 1.245-1.25h.011Z"
                clipRule="evenodd"
              />
            </Svg>
          </ClickIcon>
          <ClickIcon>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width={25}
              height={31}
              fill="none">
              <Path
                fill="#8D8D8D"
                fillRule="evenodd"
                d="M23.929 12.573c.592 0 1.071.48 1.071 1.071 0 6.56-5.035 11.961-11.428 12.509v3.49a1.072 1.072 0 0 1-2.143 0v-3.49C5.037 25.606 0 20.205 0 13.644a1.072 1.072 0 0 1 2.143 0c0 5.74 4.646 10.412 10.357 10.412 5.711 0 10.357-4.672 10.357-10.412 0-.591.48-1.071 1.072-1.071ZM12.5 0c3.79 0 6.874 3.096 6.874 6.901V13.6c0 3.804-3.084 6.9-6.874 6.9-3.79 0-6.874-3.096-6.874-6.9V6.9C5.626 3.096 8.71 0 12.5 0Zm0 2.143c-2.609 0-4.731 2.134-4.731 4.758V13.6c0 2.621 2.122 4.757 4.731 4.757s4.731-2.136 4.731-4.757V6.9c0-2.624-2.122-4.758-4.731-4.758Z"
                clipRule="evenodd"
              />
            </Svg>
          </ClickIcon>
        </View>
      )}

      {/* send icon */}
      {isTyping && (
        <Pressable onPress={handleAddMessage}>
          <Image
            style={styles.send_btn}
            source={require('../../Assets/paper-plane.png')}
          />
        </Pressable>
      )}
    </View>
  );
}

export default ChatFooter;
