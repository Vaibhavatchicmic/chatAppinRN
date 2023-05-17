import {ActivityIndicator, Text, View} from 'react-native';
import React from 'react';
import {MyButton} from '../Splash_Screen/MyButton';
import {CustomFormInput} from './CustomFormInput';
import {styles} from './styles';

export function Form({form_data}) {
  return (
    <View style={[styles.F_padV, styles.p_h]}>
      {/* <Text>{form_data.heading</Text> */}
      <View style={styles.F_padB2}>
        {form_data.inputs.map(input => (
          <CustomFormInput key={input.id} {...input} />
        ))}
      </View>
      <MyButton onPress={form_data.onSubmit}>
        {form_data.isSubmitting ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.Text2}> </Text>
            <View style={{overflow: 'visible'}}>
              <ActivityIndicator color="white" size="large" />
            </View>
            <Text style={styles.Text2}> </Text>
          </View>
        ) : (
          <Text style={[styles.Text2, styles.colorWhite, styles.text_center]}>
            {form_data.Submit_text}
          </Text>
        )}
      </MyButton>
    </View>
  );
}
