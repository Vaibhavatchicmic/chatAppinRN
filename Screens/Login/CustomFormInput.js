import {Text, TextInput, View} from 'react-native';
import React from 'react';
import {styles} from './styles';

export function CustomFormInput({
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
