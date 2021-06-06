import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../../components/Button';
import InputText from '../../components/InputText';
import {Container, Text} from '../../components/StyledComponent';
import colors from '../../utils/colors';
import {heightPercentageToDP as hp} from '../../utils/responsive';
import auth from '@react-native-firebase/auth';
import ActivityModal from '../../components/ActivityModal';
import validateEmail from '../../utils/validateEmail';
import Snackbar from 'react-native-snackbar';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !fullname) {
      Snackbar.show({text: 'All Field are required'});
      return;
    }

    if (validateEmail(email)) {
      if (password.length >= 8) {
        setLoading(true);
        try {
          let response = await auth().createUserWithEmailAndPassword(
            email,
            password,
          );
          if (response) {
            const update = {
              displayName: fullname,
              photoURL: null,
            };

            auth()
              .currentUser.updateProfile(update)
              .then(res => {
                console.log(res);
                Snackbar.show({text: 'welcome'});
                setLoading(false);
              })
              .catch(e => {
                setLoading(false);
                console.log(e.message);
                setMessage(e.message);
              });
          }
        } catch (e) {
          console.error(e.message);
          setLoading(false);
          setMessage(e.message);
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
      <ActivityModal isLoading={loading} />
      <Text size="35px" isCenter case="uppercase" isBold>
        Create an Account
      </Text>
      <Text
        size="23px"
        isCenter
        case="capitalize"
        style={{marginBottom: 30}}
        color={colors.secondary}>
        Sign Up to get started
      </Text>
      <InputText
        placeholder="Jane Doe"
        value={fullname}
        onChangeText={setFullname}
        icon="person"
      />
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
      <Button title="Sign up" full onPress={handleSignUp} />
      <View style={styles.footer}>
        <View style={styles.hr} />
        <Text isCenter onPress={() => navigation.navigate('sign-in')}>
          Already Have an Account Login ?
        </Text>
      </View>
    </Container>
  );
};

export default SignUp;

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
