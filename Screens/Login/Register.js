import {Image, Text, View, StatusBar, ScrollView} from 'react-native';
import React, {useState} from 'react';
import BackButton from '../Widgets/BackButton';
import CallApi from '../../Utility/network';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {AltNavigate} from './AltNavigate';
import {Form} from './Form';
import MyStatusBar from '../Widgets/MyStatusBar';

export function Register({navigation}) {
  const [inputs, setInputs] = useState({Name: '', UserId: '', Password: ''});
  const dispatch = useDispatch();
  // const isKeyBoard = useIsKeyBoard();
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
    console.log('registering');
    setInputs({Name: '', UserId: '', Password: ''});
    const res = await CallApi('users', 'POST', {
      uid: inputs.UserId,
      name: 'abc',
    });
    console.log(res);
    if (res.data) {
      dispatch({
        type: 'user/register',
        payload: {
          username: res.data.name,
          id: res.data.uid,
        },
      });
      navigation.navigate('Home');
    }
  }
  const form_data = {
    Submit_text: 'Register',
    onSubmit() {
      dispatch(handleRegister);
    },
    inputs: [
      {
        id: 1,
        label: 'Your username',
        value: inputs.Name,
        name: 'Name',
        handleChangeInputs,
        isSecureEntry: false,
      },
      {
        id: 2,
        label: 'Unique Id',
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
    <ScrollView style={styles.con}>
      <MyStatusBar />
      {/* Back button */}

      <View style={styles.Back_btn}>
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

      <View>
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
