import {Image, Text, View, StatusBar, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../Widgets/BackButton';
import CallApi from '../../Utility/network';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {AltNavigate} from './AltNavigate';
import {Form} from './Form';
import MyStatusBar from '../Widgets/MyStatusBar';
import {selectCurrentUser} from '../../Redux/userReducer';
import {setUserInDB_f} from '../../Redux/userReducer';

export function Register({navigation}) {
  const [inputs, setInputs] = useState({Name: '', UserId: '', Password: ''});
  const dispatch = useDispatch();
  // const isKeyBoard = useIsKeyBoard();
  const user = useSelector(selectCurrentUser);
  const isSubmitting = user.status === 'submitting';
  function handleChangeInputs(name, val) {
    setInputs({
      ...inputs,
      [name]: val,
      abc: 'abc',
    });
    // console.log('input changing', name, val);
    // console.log('inputs :', inputs);
  }
  async function handleRegister(dispatch, getState) {
    var regexp = /^[a-zA-Z0-9-_]+$/;

    if (inputs.Name === '') {
      Alert.alert("Name can't be empty");
      return;
    } else if (inputs.UserId === '') {
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

    console.log('registering');

    dispatch({
      type: 'user/submit',
    });

    const res = await CallApi('users', 'POST', {
      uid: inputs.UserId,
      name: inputs.Name,
      withAuthToken: 1,
    });
    // console.log(res);
    if (res.data) {
      dispatch({type: 'user/cancle'});
      navigation.navigate('Login');
      // dispatch(
      //   setUserInDB_f(
      //     {
      //       name: res.data.name,
      //       token: res.data.authToken,
      //       password: inputs.Password,
      //       uid: res.data.uid,
      //     },
      //     'register',
      //   ),
      // );
      //   {
      //   type: 'user/register',
      //   payload: {
      //     username: res.data.name,
      //     id: res.data.uid,
      //   },
      // }
      setInputs({Name: '', UserId: '', Password: ''});
    } else {
      if (res.message) {
        Alert.alert(res.message);
      } else {
        Alert.alert(
          'Register failed',
          res.error?.message
            ? res.error?.message.replaceAll('uid', 'User Id')
            : '',
        );
      }

      dispatch({
        type: 'user/failed',
        // payload: {
        //   message: 'network request failed',
        // },
      });
    }
  }
  const form_data = {
    Submit_text: 'Register',
    isSubmitting,
    onSubmit() {
      dispatch(handleRegister);
    },
    inputs: [
      {
        id: 1,
        label: 'Your Name',
        value: inputs.Name,
        name: 'Name',
        handleChangeInputs,
        isSecureEntry: false,
      },
      {
        id: 2,
        label: 'User Id',
        value: inputs.UserId,
        name: 'UserId',
        handleChangeInputs,
        isSecureEntry: false,
      },
      {
        id: 3,
        label: 'Password',
        value: inputs.Password,
        name: 'Password',
        handleChangeInputs,
        isSecureEntry: true,
      },
    ],
  };
  return (
    <ScrollView style={styles.con} overScrollMode="never" bounces={false}>
      <MyStatusBar />
      {/* Back button */}

      <View style={[styles.Back_btn, styles.p_h]}>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>

      {/* Abosolute Image */}
      <View style={styles.Tilted_image}>
        <Image source={require('../../Assets/login_img.png')} />
      </View>

      {/* text */}

      <View style={styles.p_h}>
        <Text style={styles.Heading}>Hello, Start your Journey</Text>

        <Text style={styles.Text}>
          Happy to see you, to create your account{' '}
        </Text>
        <Text style={styles.Text}>please Register first.</Text>
      </View>

      <Form form_data={form_data} />

      <AltNavigate
        onPress={() => {
          navigation.navigate('Login');
        }}
        text1="Already Have an account, "
        text2="Login Here"
      />
    </ScrollView>
  );
}
