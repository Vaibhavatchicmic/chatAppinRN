import React from 'react';
import {Pressable} from 'react-native';
import {styles} from './styles';

export function MyButton({children, onPress}) {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      {children}
    </Pressable>
  );
}
