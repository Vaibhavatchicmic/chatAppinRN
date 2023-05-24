import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import MySearchBar from './MySearchBar';
import ChatsList from './ChatsList';
import Styles from './Styles';
import {fetchGroups} from '../../Redux/chatBoxesReducer';
import {useDispatch} from 'react-redux';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState('');

  return (
    <View style={Styles.Home}>
      {/* Search bar */}
      <MySearchBar
        SearchPlaceholder="Search Chat"
        icon="reload"
        iconPress={() => {
          dispatch(fetchGroups());
        }}
        setFilterValue={setFilterValue}
        filtering={true}
      />

      {/* Chats */}
      <ChatsList navigation={navigation} filterValue={filterValue} />

      {/* Navigator */}
    </View>
  );
};

export default Home;
