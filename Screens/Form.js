import React from 'react';
import {
  View,
  Pressable,
  Text,
  ActivityIndicator,
  TextInput,
  StyleSheet,
} from 'react-native';
import MyModal from './MyModal';
export default function Form({form_data, modal, setModal, showLoader = false}) {
  return (
    <View style={styles.flex_con}>
      <Text style={styles.heading}>{form_data.heading}</Text>
      <View style={styles.container}>
        <View style={styles.box}>
          <View>
            {form_data.inputs.map(input => (
              <CustomFormInput
                key={input.id}
                state={input.state}
                name={input.name}
                InputHandler={input.InputHandler}
                isSecureEntry={input.name === 'Password'}
              />
            ))}
          </View>

          <Pressable
            style={styles.Login_button}
            onPress={form_data.submits[0].onSubmit}>
            <Text style={styles.Login_text}>{form_data.submits[0].name}</Text>
          </Pressable>
        </View>
        <View style={styles.SignUp_con}>
          <Text>{form_data.submits[1].desc}</Text>
          <Pressable onPress={form_data.submits[1].onSubmit}>
            <Text style={styles.SignUp_text}>{form_data.submits[1].name}</Text>
          </Pressable>
        </View>
      </View>
      <MyModal modal={modal} setModal={setModal} />
      {showLoader && (
        <ActivityIndicator
          style={[styles.loader]}
          size={'large'}
          animating={true}
        />
      )}
    </View>
  );
}

const CustomFormInput = ({
  state = '',
  name = '',
  InputHandler = () => {},
  isSecureEntry = false,
}) => {
  return (
    <View>
      <Text style={styles.text}>{name}</Text>
      <TextInput
        name={name}
        style={styles.input}
        value={state}
        placeholder={`Enter your ${name}`}
        onChangeText={val => {
          // console.log('changing text', val, name);
          InputHandler(val, name);
        }}
        secureTextEntry={isSecureEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
