import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

function Seperator() {
  return (
    <View style={[styles.flexRow, {paddingBottom: 30, paddingHorizontal: 20}]}>
      <View style={styles.Horizontal_Line} />
      <Text>Or Login With</Text>
      <View style={styles.Horizontal_Line} />
    </View>
  );
}

export default Seperator;

const styles = StyleSheet.create({
  Horizontal_Line: {
    top: 10,
    width: 100,
    height: 1,
    backgroundColor: 'black',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
});
