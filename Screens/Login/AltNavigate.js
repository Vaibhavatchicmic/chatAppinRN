import {Pressable, Text, View} from 'react-native';
import React from 'react';
import {styles} from './styles';

export function AltNavigate({onPress, text1, text2}) {
  return (
    <View style={styles.alt_navigate}>
      <Text>{text1}</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.color_purple}>{text2}</Text>
      </Pressable>
    </View>
  );
}
