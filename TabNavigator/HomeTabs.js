import Profile from '../Screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  MyNavigator,
  MyNavigator1,
  MyNavigator2,
  MyNavigator3,
} from '../Screens/Home/MyNavigator';
import React, {useEffect} from 'react';
import Home from '../Screens/Home';
import {StyleSheet} from 'react-native';
import {
  startMessagesListener,
  stopMessagesListener,
} from '../Utility/CometChat';
import {useDispatch} from 'react-redux';
import {db_createGroupMessages} from '../database.native';
import AddContact from '../Screens/AddContacts';
import AddContacts from '../Screens/AddContacts';

const Tab = createBottomTabNavigator();
export function MyTabs() {
  const dispatch = useDispatch();
  useEffect(() => {
    startMessagesListener(textMessage => {
      console.log('new message', textMessage);
      dispatch({
        type: 'messages/added',
        payload: {
          message: textMessage.rawMessage,
          chatBoxId: textMessage.rawMessage.conversationId,
        },
      });
      db_createGroupMessages(
        JSON.stringify(textMessage.rawMessage),
        textMessage.rawMessage.sender,
        textMessage.rawMessage.sentAt,
        +textMessage.rawMessage.id,
        textMessage.rawMessage.conversationId,
      );
    });
    return stopMessagesListener;
  }, [dispatch]);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#771F98',
        tabBarShowLabel: false,
        tabBarStyle: styles.Footer,
        backgroundColor: 'red',
      }}
      initialRouteName="ChatBoxes">
      <Tab.Screen
        name="ChatBoxes"
        component={Home}
        options={{
          tabBarLabel: 'asdf',
          tabBarIcon: ({color}) => <MyNavigator1 color={color} />,
        }}
      />
      <Tab.Screen
        name="AddContacts"
        component={AddContacts}
        options={{
          tabBarIcon: ({color}) => <MyNavigator2 color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'asdfdsf',
          tabBarIcon: ({color}) => <MyNavigator3 color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  Footer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#F8F8F8',
    // backgroundColor: 'red',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderTopWidth: 5,
    borderTopColor: '#ececec',

    // shadowOffset: '#1A000000',
    // shadowColor: 'red',
    // // shadowColor: 'black',
    // shadowRadius: 20,
    // shadowOpacity: 1,
    zIndex: 100,
    // paddingHorizontal: 10,
    height: 70,
  },
});
