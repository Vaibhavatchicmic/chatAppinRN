import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loading = () => {
  return <Text style={styles.Loading}>Loading...</Text>;
};

export default Loading;

const styles = StyleSheet.create({
  Loading: {
    // width: 100,
    backgroundColor: 'purple',
    color: 'white',
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    textAlign: 'center',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    zIndex: 100,
  },
});
