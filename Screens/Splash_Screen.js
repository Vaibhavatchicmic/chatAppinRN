import React, {useEffect, useRef} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import MyModal from './Widgets/Modal';
import {useSelector} from 'react-redux';
import {selectCurrentUser, selectUsername} from '../Redux/store';
export default function SplashScreen({navigation}) {
  const User = useSelector(selectCurrentUser);
  console.log(User);
  useEffect(() => {
    if (User.token) {
      navigation.navigate('Chats');
    }
  });
  return (
    <View>
      <StatusBar backgroundColor="white" color="black" />
      <View style={styles.Text1Box}>
        <Text style={styles.Test1}>Get Closer To</Text>
        <Text style={styles.Test1}>EveryOne</Text>
      </View>
      <View style={styles.Text2Box}>
        <Text style={styles.Text2}>Helps you to contact everyone with</Text>
        <Text style={styles.Text2}>just easy way</Text>
      </View>
      <View style={styles.Image}>
        <Image
          source={require('../Assets/f825d97434ba2e93efa9c9d869e95c6c.png')}
        />
      </View>
      <View style={styles.btnBox}>
        <MyButton onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btn_text}>Get Started</Text>
        </MyButton>
      </View>
    </View>
  );
}

export function MyButton({children, onPress}) {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  Text1Box: {
    paddingTop: 50,
    paddingLeft: 40,
  },
  Test1: {
    fontFamily: 'Poppins',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  Text2Box: {
    paddingTop: 20,
    paddingLeft: 30,
  },
  Text2: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 15,
    color: 'black',
  },
  Image: {
    paddingTop: 50,
    paddingVertical: 40,
  },
  btn: {
    backgroundColor: '#771F98',
    borderRadius: 15,
    paddingHorizontal: 90,
    paddingVertical: 8,
    textAlign: 'center',
    color: 'white',
  },
  btn_text: {
    fontFamily: 'Poppins',
    fontSize: 25,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  btnBox: {
    paddingTop: 40,
    paddingHorizontal: 50,
  },
});
