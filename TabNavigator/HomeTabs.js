import Profile from '../Screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  MyNavigator,
  MyNavigator1,
  MyNavigator3,
} from '../Screens/Home/MyNavigator';
import React from 'react';
import Home from '../Screens/Home';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();
export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#771F98',
        tabBarShowLabel: false,
        tabBarStyle: styles.Footer,
        backgroundColor: 'red',
      }}
      initialRouteName="Chats">
      <Tab.Screen
        name="Chats"
        component={Home}
        options={{
          tabBarLabel: 'asdf',
          tabBarIcon: ({color}) => <MyNavigator1 color={color} />,
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
