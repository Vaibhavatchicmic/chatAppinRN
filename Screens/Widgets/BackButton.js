import {Text, View, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Svg, Path} from 'react-native-svg';

export default function ({onPress}) {
  return (
    <Pressable onPress={onPress}>
      <Image
        style={styles.Samll_Image}
        source={require('../../Assets/back_arrow.png')}
      />
    </Pressable>
  );
}

export function BackButton2({onPress, fill}) {
  return (
    <Pressable onPress={onPress}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none">
        <Path
          fill={fill || '#000'}
          d="M20 10c0 .56-.342 1.024-.786 1.097l-.123.01H3.11l5.773 7.001c.355.432.357 1.133.002 1.566-.322.394-.827.431-1.183.11l-.102-.107-7.334-8.892a1.101 1.101 0 0 1-.204-.38.951.951 0 0 1-.038-.147 1.04 1.04 0 0 1-.02-.147A1.122 1.122 0 0 1 0 10.043v-.086l.004-.065L0 10a1.349 1.349 0 0 1 .096-.494 1.096 1.096 0 0 1 .083-.165l.008-.013a1.08 1.08 0 0 1 .08-.11v-.002L7.601.323c.355-.432.931-.43 1.285.003.322.394.35 1.009.086 1.442l-.088.124-5.771 7 15.978.001c.502 0 .909.496.909 1.107Z"
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Samll_Image: {
    height: 40,
    width: 40,
  },
});
