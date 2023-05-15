//Learning redux fundamentals, not using redux tool kit
import {createStore} from 'redux';
import React, {StrictMode} from 'react';
import {
  SafeAreaView,
  Settings,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Login from './Screens/Login';
import {Register} from './Screens/Login/Register';
import SplashScreen from './Screens/Splash_Screen/Splash_Screen';
import Chats from './Screens/Chat/Chats';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from './Redux/store';
import Home from './Screens/Home';
import Profile from './Screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MyNavigator, MyNavigator3} from './Screens/Home/MyNavigator';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#771F98',
        tabBarShowLabel: false,
      }}
      initialRouteName="Profile">
      <Tab.Screen
        name="Chats"
        component={Home}
        options={{
          tabBarLabel: 'asdf',
          tabBarIcon: ({color}) => <MyNavigator color={color} />,
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

function App() {
  return (
    // <StrictMode>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Chats" component={Chats} />
          <Stack.Screen name="Home" component={MyTabs} />
          {/* <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    // </StrictMode>
  );
}

// const styles = StyleSheet.create({
//   input: {
//     padding: 10,
//     borderWidth: 2,
//   },
// });

export default App;
