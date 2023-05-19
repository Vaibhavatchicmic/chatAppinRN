import React, {useEffect, useRef} from 'react';
import {Image, Text, View, StatusBar, Alert} from 'react-native';
import MyModal from '../Widgets/Modal';
import {useSelector} from 'react-redux';
import {selectUsername} from '../../Redux/store';
import {MyButton} from './MyButton';
import {styles} from './styles';
import {selectCurrentUser} from '../../Redux/userReducer';
import MyStatusBar from '../Widgets/MyStatusBar';
import MyActivityIndicator from '../Widgets/MyActivityIndicator';
export default function SplashScreen({navigation}) {
  const user = useSelector(selectCurrentUser);
  // console.log("user: ",user);
  // useEffect(() => {
  //   if (user.status === 'idle') {
  //     navigation.navigate('Home');
  //   }
  // });
  console.log(user.status);
  return (
    <View style={{backgroundColor: '#F8F8F8', flex: 1}}>
      {user.status === 'loading' ? (
        <>
          <StatusBar backgroundColor="#F8F8F8" />
          <MyActivityIndicator />
        </>
      ) : (
        <>
          <MyStatusBar />
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
              source={require('../../Assets/f825d97434ba2e93efa9c9d869e95c6c.png')}
            />
          </View>
          <View style={styles.btnBox}>
            <MyButton
              onPress={() => {
                // Alert.alert('getting started');
                // console.log('geting started');
                navigation.navigate('Login');
              }}>
              <Text style={styles.btn_text}>Get Started</Text>
            </MyButton>
          </View>
        </>
      )}
      {/* <MyModal></MyModal> */}
    </View>
  );
}
