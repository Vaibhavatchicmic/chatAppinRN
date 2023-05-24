import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Svg, Path} from 'react-native-svg';
import {styles} from './styles';

const ClickElement = ({text, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.ClickElement, styles.pad_h, {marginVertical: 1}]}>
      <Text
        style={[
          styles.Text2,
          styles.Text3,
          text === 'Sign Out' ? styles.col_red : styles.col_black,
        ]}>
        {text}
      </Text>
      {/* icon */}
      <Svg
        style={styles.edit_image}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M10 17l5-5-5-5"
          stroke="#838080"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
};

export default ClickElement;
