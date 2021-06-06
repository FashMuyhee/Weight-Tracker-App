import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text, Container, RowBetween} from '../components/StyledComponent';
import {heightPercentageToDP as hp} from '../utils/responsive';
import trainer from '../assets/images/trainer.png';
import Button from '../components/Button';
const Landing = ({navigation}) => {
  return (
    <Container pad styles={styles.container} height="100%">
      <Text case="uppercase" isTitle isCenter style={{marginVertical: hp(6)}}>
        Weight Tracker
      </Text>
      <Image source={trainer} style={styles.illustration} />
      <View style={{width: '30%', alignSelf: 'center'}}>
        <Text
          case="capitalize"
          isTitle
          isCenter
          style={{marginVertical: hp(6)}}>
          Track your weight loss
        </Text>
      </View>
      <RowBetween>
        <Button
          title="Sign In"
          onPress={() => navigation.navigate('sign-in')}
        />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('sign-up')}
        />
      </RowBetween>
    </Container>
  );
};

export default Landing;
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  illustration: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
});
