import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {MyButton} from '../Splash_Screen/Splash_Screen';
import BackButton from '../Widgets/BackButton';
import MyModal from '../Widgets/Modal';
import CallApi from '../../Utility/network';
import {useDispatch} from 'react-redux';
import useIsKeyBoard from '../../Utility/useIsKeyBoard';

export default function Login({navigation}) {
  const [inputs, setInputs] = useState({UserId: '', Password: ''});
  const isKeyBoard = useIsKeyBoard();
  const dispatch = useDispatch();
  function handleChangeInputs(name, val) {
    setInputs({
      ...inputs,
      [name]: val,
      abc: 'abc',
    });
    // console.log('input changing', name, val);
    // console.log('inputs :', inputs);
  }

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
      navigation.navigate('Home');
    }
  }

  const form_data = {
    Submit_text: 'Login',
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
      <StatusBar backgroundColor="#F8F8F8" />

      {/* Back button */}
      {!isKeyBoard && (
        <View style={styles.Back_btn}>
          <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      )}
      {/* Abosolute Image */}
      <View style={styles.Tilted_image}>
        <Image source={require('../../Assets/login_img.png')} />
      </View>

      {/* text */}
      <View>
        <Text style={styles.Heading}>Hello, Welcome Back</Text>
        <Text style={styles.Text}>Happy to see you again, to use your</Text>
        <Text style={styles.Text}>account please login first.</Text>
      </View>

      <Form form_data={form_data} />

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
      <StatusBar backgroundColor="#F8F8F8" />
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

const styles = StyleSheet.create({
  color_purple: {
    color: 'purple',
  },
  alt_navigate: {
    marginTop: 20,
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  Horizontal_Line: {
    top: 10,
    width: 100,
    height: 1,
    backgroundColor: 'black',
  },
  con: {
    paddingHorizontal: 22,
  },
  Samll_Image: {
    height: 40,
    width: 40,
  },
  Back_btn: {
    paddingVertical: 40,
  },
  Heading: {
    fontFamily: 'Poppins',
    fontWeight: '800',
    color: 'black',
    fontSize: 24,
    paddingBottom: 10,
  },
  Text: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 15,
    color: 'black',
    paddingBottom: 5,
  },
  Text2: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 20,
    color: 'black',
    paddingBottom: 5,
  },
  Tilted_image: {
    position: 'absolute',
    top: 72,
    right: 0,
  },
  CFI_TextInput: {
    borderWidth: 2,
    borderColor: '#6B6B6B',
    padding: 10,
    borderRadius: 20,
  },
  F_padV: {
    paddingVertical: 60,
  },
  F_padB: {
    paddingBottom: 20,
  },
  F_padB2: {
    paddingBottom: 50,
  },
  F_padB3: {
    paddingBottom: 10,
  },
  F_padL: {
    paddingLeft: 20,
  },
  colorWhite: {
    color: 'white',
  },
  text_center: {
    textAlign: 'center',
    padding: 5,
  },
});

function AltNavigate({onPress, text1, text2}) {
  return (
    <View style={styles.alt_navigate}>
      <Text>{text1}</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.color_purple}>{text2}</Text>
      </Pressable>
    </View>
  );
}

function Form({form_data}) {
  return (
    <View style={[styles.F_padV]}>
      {/* <Text>{form_data.heading</Text> */}
      <View style={styles.F_padB2}>
        {form_data.inputs.map(input => (
          <CustomFormInput key={input.id} {...input} />
        ))}
      </View>
      <MyButton onPress={form_data.onSubmit}>
        <Text style={[styles.Text2, styles.colorWhite, styles.text_center]}>
          {form_data.Submit_text}
        </Text>
      </MyButton>
    </View>
  );
}

function CustomFormInput({
  id,
  label,
  value,
  handleChangeInputs,
  name,
  isSecureEntry,
}) {
  return (
    <View style={styles.F_padB}>
      <Text style={[styles.Text, styles.F_padL, styles.F_padB3]}>{label}</Text>
      <TextInput
        style={styles.CFI_TextInput}
        name={label}
        value={value}
        onChangeText={val => handleChangeInputs(name, val)}
        secureTextEntry={isSecureEntry}
      />
    </View>
  );
}
