import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../../components/Button';
import InputText from '../../components/InputText';
import ActivityModal from '../../components/ActivityModal';
import {Container, Text} from '../../components/StyledComponent';
import colors from '../../utils/colors';
import {heightPercentageToDP as hp} from '../../utils/responsive';
import auth from '@react-native-firebase/auth';
import validateEmail from '../../utils/validateEmail';
// import {Snackbar} from 'react-native-snack';
import Snackbar from 'react-native-snackbar';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setMessage('All Field are required');
      Snackbar.show({text: 'All Field are required'});

      return;
    }

    if (validateEmail(email)) {
      if (password.length >= 8) {
        setLoading(true);
        try {
          let response = await auth().signInWithEmailAndPassword(
            email,
            password,
          );
          if (response) {
            Snackbar.show({text: 'Login Successful'});
            setLoading(false);
          }
        } catch (e) {
          console.error(e.message);
          setLoading(false);
          setMessage(e);
        }
      } else {
        Snackbar.show({
          text: 'Password Too Short, must be at least 8 characters ',
        });
      }
    } else {
      Snackbar.show({text: 'Invalid Email'});
    }
  };

  return (
    <Container height="100%" pad style={styles.container}>
      {/* <SnackBar
        visible={ture}
        message={message?.message}
        actionHandler={() => {
          setMessage(null);
        }}
        action="ok"
        actionTextStyle={{color: colors.primary}}
      /> */}
      <ActivityModal isLoading={loading} />
      <Text size="35px" isCenter case="uppercase" isBold>
        Welcome
      </Text>
      <Text
        size="23px"
        isCenter
        case="capitalize"
        style={{marginBottom: 30}}
        color={colors.secondary}>
        Sign in to continue
      </Text>
      <InputText
        placeholder="janedoe@email.com"
        value={email}
        onChangeText={setEmail}
        icon="mail"
        type="email-address"
      />
      <InputText
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        isPassword
        icon="lock"
        toggleVisibility={() => setPasswordVisible(!passwordVisible)}
        passwordVisible={passwordVisible}
      />
      <Button title="Sign in" full onPress={handleSignIn} />
      <View style={styles.footer}>
        <View style={styles.hr} />
        <Text isCenter onPress={() => navigation.navigate('sign-up')}>
          Don't Have and Account Register ?
        </Text>
      </View>
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  footer: {
    marginTop: '10%',
    alignItems: 'center',
  },
  hr: {
    height: 3,
    width: 100,
    backgroundColor: colors.primary,
    marginBottom: 10,
  },
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
});
