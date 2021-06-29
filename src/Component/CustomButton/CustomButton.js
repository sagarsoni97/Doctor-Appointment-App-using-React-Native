import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../GlobalStyles/Colors/Colors';

export const CustomButton = ({title, onPress, backgroundColor, color}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={{ width: 200,
        height: 50,
        backgroundColor: backgroundColor,
        borderRadius: 20,
        marginTop: '5%',
        alignSelf: 'center'}}>
      <Text style={{fontSize: 20, color: color,
      textAlign: 'center',
      padding: 10}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
