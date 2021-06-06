import React, {useState, useContext} from 'react';
import {View, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native';
import {color} from 'react-native-reanimated';
import Button from '../components/Button';
import {Container, Text} from '../components/StyledComponent';
import colors from '../utils/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../utils/responsive';
import firestore from '@react-native-firebase/firestore';
import ActivityModal from '../components/ActivityModal';
import Snackbar from 'react-native-snackbar';
import {UserContext} from '../store/UserContext';

const RecordWeight = () => {
  const [weight, setWeight] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {user} = useContext(UserContext);

  const saveWeight = () => {
    if (!weight) {
      Snackbar.show({text: 'All Field are required'});
      return;
    }
    setLoading(true);
    firestore()
      .collection('daily_weights')
      .doc(user.uid)
      .collection('weight')
      .add({
        weight,
        createdAt: firestore.FieldValue.serverTimestamp(),
        uid: user.uid,
      })
      .then(() => {
        Snackbar.show({text: 'Added', duration: Snackbar.LENGTH_LONG});
        setLoading(false);
        setWeight('');
      })
      .catch(e => {
        setLoading(false);
        console.log(e.message);
        console.log(e.code);
      });
  };
  return (
    <Container
      pad
      height="100%"
      bgColor={colors.bgColor2}
      style={styles.container}>
      <ActivityModal isLoading={loading} />
      <KeyboardAvoidingView style={styles.inner} enabled behavior="padding">
        <Text case="capitalize" isBold size="40px" isCenter>
          What's your current weight ?
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="send"
          selectionColor={colors.secondary}
          placeholderTextColor="grey"
          textAlign="center"
          maxLength={4}
          autoFocus
          value={weight}
          onChangeText={setWeight}
          onSubmitEditing={saveWeight}
        />
        <Button title="Save Weight" onPress={saveWeight} />
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RecordWeight;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: hp(50),
  },
  input: {
    height: 90,
    margin: 12,
    width: wp(40),
    fontFamily: 'PTSans-Regular',
    fontSize: 70,
    color: colors.primary,
    backgroundColor: '#e6e1e1',
    borderRadius: 10,
    padding: 10,
  },
});
