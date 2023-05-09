import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MySearchBar from './MySearchBar';
import ChatsList from './ChatsList';
import MyNavigator from './MyNavigator';
import Styles from './Styles';

const Home = ({navigation}) => {
  return (
    <View style={Styles.Home}>
      {/* Search bar */}
      <MySearchBar />

      {/* Chats */}
      <ChatsList navigation={navigation} />

      {/* Navigator */}
      <MyNavigator />
    </View>
  );
};

export default Home;
