import React from 'react';
import {StyleSheet, TouchableNativeFeedback, Text, View} from 'react-native';
import colors from '../utils/colors';

const Button = ({onPress, title, full}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.btn, {width: full ? '100%' : '47%'}]}>
        <Text style={styles.label}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    height: 70,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 10,
  },
  label: {
    color: colors.secondary,
    fontFamily: 'PTSans-Regular',
    fontSize: 24,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
