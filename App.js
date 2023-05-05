//Learning redux fundamentals, not using redux tool kit
import {createStore} from 'redux';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import Login from './Screens/Login';
import SplashScreen from './Screens/Splash_Screen';
import Chats from './Screens/Chat/Chats';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const initalState = {value: '123'};

function myReducer(state = initalState, action) {
  switch (action.type) {
    case 'input/change':
      return {...state, value: action.value};
    case 'action2':
      return {...state};
    default:
      return state;
  }
}

const store = createStore(myReducer);

console.log('state: ', store.getState());
// const unsubscribe = store.subscribe(() => {
//   console.log('state changed :', store.getState());
// });

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Chats" component={Chats} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function InuputCom() {
  const input = useSelector(state => state.value);
  const dispatch = useDispatch();
  function handleInput(val) {
    dispatch({
      type: 'input/change',
      value: val,
    });
  }
  console.log('State', store.getState());
  return (
    <>
      <Text>Enter Value</Text>
      <TextInput
        value={input}
        style={styles.input}
        onChangeText={handleInput}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 2,
  },
});

export default App;
