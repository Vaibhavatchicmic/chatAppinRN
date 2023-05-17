import {View, Text} from 'react-native';
import React from 'react';

import Login from '../Screens/Login';
import {Register} from '../Screens/Login/Register';
import SplashScreen from '../Screens/Splash_Screen/Splash_Screen';
import Chats from '../Screens/Chat/Chats';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {selectCurrentUser} from '../Redux/userReducer';
import {MyTabs} from '../TabNavigator/HomeTabs';

const Stack = createNativeStackNavigator();

export const MyStack = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <NavigationContainer>
      {user.status === 'no_user' ? (
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={MyTabs} />
          <Stack.Screen name="Chats" component={Chats} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MyStack;
