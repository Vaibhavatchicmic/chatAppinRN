import {
  Image,
  Pressable,
  Text,
  View,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BackButton from '../Widgets/BackButton';
import MyModal from '../Widgets/Modal';
import CallApi from '../../Utility/network';
import {useDispatch} from 'react-redux';
import useIsKeyBoard from '../../Utility/useIsKeyBoard';
import {Form} from './Form';
import {AltNavigate} from './AltNavigate';
import {styles} from './styles';
import MySearchBar from '../Home/MySearchBar';
import MyStatusBar from '../Widgets/MyStatusBar';

export default function Login({navigation}) {
  const [inputs, setInputs] = useState({UserId: '', Password: ''});
  const isKeyBoard = useIsKeyBoard();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Login mounted');
  }, []);
  function handleChangeInputs(name, val) {
    setInputs({
      ...inputs,
      [name]: val,
      abc: 'abc',
    });
    // console.log('input changing', name, val);
    // console.log('inputs :', inputs);
  }
  // const isKeyBoard = false;
  async function handleLogin() {
    console.log('loging');
    setInputs({UserId: '', Password: ''});
    const res = await CallApi('users/' + inputs.UserId);
    console.log(res);
    if (res.data) {
      dispatch({
        type: 'user/login',
        payload: {
          username: res.data.name,
          id: res.data.uid,
        },
      });
    }
  }

  const form_data = {
    Submit_text: 'Login',
    isSubmitting: false,
    onSubmit() {
      if (inputs.Email === '') {
        Alert.alert("UserId can't be empty");
        return;
      } else if (inputs.Password === '') {
        Alert.alert("Passward can't be empty");
        return;
      }
      dispatch(handleLogin);
    },
    inputs: [
      {
        id: 1,
        label: 'Unique Id',
        value: inputs.UserId,
        name: 'UserId',
        handleChangeInputs,
        isSecureEntry: false,
      },
      {
        id: 2,
        label: 'Password',
        value: inputs.Password,
        name: 'Password',
        handleChangeInputs,
        isSecureEntry: true,
      },
    ],
  };

  return (
    <View style={styles.con}>
      <MyStatusBar />

      <KeyboardAvoidingView behavior="position">
        {/* Back button */}
        <View style={[styles.Back_btn, styles.p_h]}>
          {isKeyBoard ? (
            <View
              style={{
                //do some thing for this style
                height: 40,
                width: 40,
              }}
            />
          ) : (
            <BackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
          )}
        </View>
        {/* Abosolute Image */}
        <View style={[styles.Tilted_image]}>
          <Image source={require('../../Assets/login_img.png')} />
        </View>
        <View style={styles.p_h}>
          <Text style={styles.Heading}>Hello, Welcome Back</Text>
          <Text style={styles.Text}>Happy to see you again, to use your</Text>
          <Text style={styles.Text}>account please login first.</Text>
        </View>

        <Form form_data={form_data} />
      </KeyboardAvoidingView>
      {/* text */}

      {/* or login with */}
      <View
        style={[styles.flexRow, {paddingBottom: 30, paddingHorizontal: 20}]}>
        <View style={styles.Horizontal_Line} />
        <Text style={styles.Text}>Or Login With</Text>
        <View style={styles.Horizontal_Line} />
      </View>

      {/* other login icons */}
      <View style={[styles.flexRow, {paddingHorizontal: 60}]}>
        <Pressable>
          <Image
            // style={styles.Samll_Image}
            source={require('../../Assets/Google.png')}
          />
        </Pressable>
        <Pressable>
          <Image
            // style={styles.Samll_Image}
            source={require('../../Assets/Apple.png')}
          />
        </Pressable>
        <Pressable>
          <Image
            // style={styles.Samll_Image}
            source={require('../../Assets/Facebook.png')}
          />
        </Pressable>
      </View>

      <AltNavigate
        onPress={() => {
          navigation.navigate('Register');
        }}
        text1="Don't have an Account, "
        text2="Register first"
      />

      {/* <MyModal /> */}
    </View>
  );
}
