import {View, Text, KeyboardAvoidingView} from 'react-native';
import React, {useEffect} from 'react';

import Login from '../Screens/Login';
import {Register} from '../Screens/Login/Register';
import SplashScreen from '../Screens/Splash_Screen/Splash_Screen';
import Chats from '../Screens/Chat/Chats';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {getUserFromDB_f, selectCurrentUser} from '../Redux/userReducer';
import {MyTabs} from '../TabNavigator/HomeTabs';
import {selectCurrentChatBox} from '../Redux/currentChatBoxReducer';
import AddEditPage from '../Screens/AddEditPage';

const Stack = createNativeStackNavigator();

export const MyStack = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('getting user from DB');
    dispatch(getUserFromDB_f());
  }, [dispatch]);
  return (
    <NavigationContainer>
      {user.status !== 'idle' ? (
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
          screenOptions={{
            headerShown: false,
          }}>
          {}
          <Stack.Screen name="Home" component={MyTabs} />
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="AddEdit" component={AddEditPage} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MyStack;
