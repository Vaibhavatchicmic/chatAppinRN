import {Text, View} from 'react-native';
import React from 'react';
import {MyButton} from '../Splash_Screen/MyButton';
import {CustomFormInput} from './CustomFormInput';
import {styles} from './styles';

export function Form({form_data}) {
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
