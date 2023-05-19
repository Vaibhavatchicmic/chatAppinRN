import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MyActivityIndicator = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#771F98" />
    </View>
  );
};

export default MyActivityIndicator;

const styles = StyleSheet.create({});
