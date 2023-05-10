import {View, Text, Keyboard} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function useIsKeyBoard() {
  const [isKeyBoard, setIsKeyBoard] = useState(false);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyBoard(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyBoard(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return isKeyBoard;
}
