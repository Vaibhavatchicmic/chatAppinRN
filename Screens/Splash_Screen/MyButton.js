import React from 'react';
import {Pressable} from 'react-native';
import {styles} from './styles';

export function MyButton({children, onPress, disabled = false}) {
  return (
    <Pressable
      style={[styles.btn, disabled && styles.disBtn]}
      onPress={onPress}
      disabled={disabled}>
      {children}
    </Pressable>
  );
}
