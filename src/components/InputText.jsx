import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import colors from '../utils/colors';
import {widthPercentageToDP as wp} from '../utils/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RowBetween} from './StyledComponent';
import {color} from 'react-native-reanimated';

const InputText = ({
  onChangeText,
  value,
  isPassword,
  toggleVisibility,
  icon,
  type,
  passwordVisible,
  ...props
}) => {
  return (
    <RowBetween style={styles.inputContainer}>
      <Icon name={icon} color={colors.primary} size={25} />
      <TextInput
        {...props}
        style={[styles.input, {width: isPassword ? '83%' : '97%'}]}
        selectionColor={colors.secondary}
        placeholderTextColor="grey"
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={passwordVisible}
        keyboardType={type}
      />
      {isPassword ? (
        <Icon
          name={passwordVisible ? 'visibility-off' : 'visibility'}
          color={colors.primary}
          size={25}
          style={styles.eyeIcon}
          onPress={toggleVisibility}
        />
      ) : null}
    </RowBetween>
  );
};

export default InputText;

const styles = StyleSheet.create({
  input: {
    height: 60,
    margin: 12,
    width: '97%',
    fontFamily: 'PTSans-Regular',
    fontSize: 24,
    color: colors.primary,
    padding: 10,
    // backgroundColor: 'blue',
  },
  inputContainer: {
    backgroundColor: colors.grey,
    borderRadius: 35,
    marginVertical: 10,
    width: '100%',
    height: 65,
    padding: 10,
  },
  eyeIcon: {
    marginLeft: -10,
    // backgroundColor: 'red',
  },
});
