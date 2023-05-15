import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RoundImage = ({isGroup, isLarge}) => {
  const GroupImage = require('../../Assets/Group.png');
  const PerosnImage = require('../../Assets/Person.jpg');
  return (
    <View style={[styles.image_box, isLarge && styles.large]}>
      <Image
        style={[styles.Image_icon, isLarge && styles.large]}
        source={isGroup ? GroupImage : PerosnImage}
      />
    </View>
  );
};

export default RoundImage;

const styles = StyleSheet.create({
  Image_icon: {
    width: 60,
    height: 60,
  },
  image_box: {
    // width: 60,
    // height: 60,
    justifyContent: 'center',
    alignItems: 'center',

    width: 50,
    height: 50,
    borderRadius: 1000,
    // backgroundColor: 'black',
    overflow: 'hidden',
  },
  large: {
    width: 70,
    height: 70,
  },
});
