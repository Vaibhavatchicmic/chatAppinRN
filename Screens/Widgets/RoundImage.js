import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RoundImage = ({isGroup}) => {
  const GroupImage = require('../../Assets/Group.png');
  const PerosnImage = require('../../Assets/Person.jpg');
  return (
    <View style={styles.image_box}>
      <Image
        style={styles.Image_icon}
        source={isGroup ? GroupImage : PerosnImage}
      />
    </View>
  );
};

export default RoundImage;

const styles = StyleSheet.create({
  Image_icon: {
    width: 40,
    height: 40,
  },
  image_box: {
    // width: 60,
    // height: 60,
    justifyContent: 'center',
    alignItems: 'center',

    width: 50,
    height: 50,
    borderRadius: 70,
    // backgroundColor: 'black',
    overflow: 'hidden',
  },
});
