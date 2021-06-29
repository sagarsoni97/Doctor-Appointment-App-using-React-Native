import React from 'react';
import {TextInput} from 'react-native';

export const CustomInput = ({
  value,
  placeholder,
  onChange,
  isSecure,
  keyboardType,
  autoCompleteType,
  autoCapitalize
}) => {
  return (
    <TextInput
      value={value}
      placeholder={placeholder}
      autoCompleteType={autoCompleteType}
      autoCapitalize={autoCapitalize}
      onChangeText={value => onChange(value)}
      style={{
        borderWidth: 1,
        width: '80%',
        marginTop: '5%',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingLeft: 20,
        alignSelf: 'center'
      }}
      secureTextEntry={isSecure}
      keyboardType={keyboardType || 'default'}
    />
  );
};
