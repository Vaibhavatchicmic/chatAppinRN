import {
  Image,
  Pressable,
  Text,
  View,
  StatusBar,
  Alert,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BackButton from '../Widgets/BackButton';
import MyModal from '../Widgets/Modal';
import CallApi from '../../Utility/network';
import {useDispatch, useSelector} from 'react-redux';
import useIsKeyBoard from '../../Utility/useIsKeyBoard';
import {Form} from './Form';
import {AltNavigate} from './AltNavigate';
import {styles} from './styles';
import MySearchBar from '../Home/MySearchBar';
import MyStatusBar from '../Widgets/MyStatusBar';
import {selectCurrentUser, setUserInDB_f} from '../../Redux/userReducer';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {AUTH_KEY} from '../../Utility/CometChat';

export default function Login({navigation}) {
  const [inputs, setInputs] = useState({UserId: '', Password: ''});
  // const isKeyBoard = useIsKeyBoard();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    console.log('Login mounted');
    // if(user.status==="")
  }, []);
  const isKeyBoard = false;
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

    dispatch({
      type: 'user/submit',
    });

    const user = await CometChat.getLoggedinUser();

    if (!user) {
      console.log('trying to login');
      try {
        const res = await CometChat.login(inputs.UserId, AUTH_KEY);
        console.log(res);
        dispatch(
          setUserInDB_f({
            name: res.name,
            token: res.authToken,
            password: inputs.Password,
            uid: res.uid,
          }),
        );
        setInputs({UserId: '', Password: ''});
      } catch (e) {
        Alert.alert('Login failed', e.message?.replaceAll('UID', 'User Id'));
        console.error(e);
        dispatch({
          type: 'user/failed',
          // payload: {
          //   message: 'network request failed',
          // },
        });
      }
    } else {
      console.log('user already logged', user);
      dispatch(
        setUserInDB_f({
          name: user.name,
          token: user.authToken,
          password: inputs.Password,
          uid: user.uid,
        }),
      );
      setInputs({UserId: '', Password: ''});
    }
  }

  const form_data = {
    Submit_text: 'Login',
    isSubmitting: user.status === 'submitting',
    onSubmit() {
      var regexp = /^[a-zA-Z0-9-_]+$/;

      if (inputs.UserId === '') {
        Alert.alert("User Id can't be empty");
        return;
      } else if (inputs.UserId.search(regexp) === -1) {
        Alert.alert(
          'Invalid User Id!',
          'User Id can be alphanumeric with underscore and hyphen. Spaces, punctuation and other special characters are not allowed',
        );
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
        label: 'User Id',
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
    <ScrollView
      overScrollMode="never"
      // alwaysBounceVertical={false}
      bounces={false}
      style={styles.con}>
      <MyStatusBar />
      <View behavior="position">
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
      </View>
      {/* text */}

      {/* or login with */}
      <View
        style={[
          styles.flexRow,
          {paddingBottom: 30, paddingHorizontal: 20, display: 'none'},
        ]}>
        <View style={styles.Horizontal_Line} />
        <Text style={styles.Text}>Or Login With</Text>
        <View style={styles.Horizontal_Line} />
      </View>

      {/* other login icons */}
      <View style={[styles.flexRow, {paddingHorizontal: 60, display: 'none'}]}>
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
    </ScrollView>
  );
}
