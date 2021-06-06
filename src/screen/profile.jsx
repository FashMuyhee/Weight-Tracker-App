import React, {useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Container, Text, Card, RowBetween} from '../components/StyledComponent';
import colors from '../utils/colors';
import avatar from '../assets/images/avatar.jpg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {UserContext} from '../store/UserContext';

const Profile = () => {
  const {user} = useContext(UserContext);

  return (
    <Container pad bgColor={colors.bgColor2} height="100%">
      <Image source={avatar} style={styles.avatar} />
      <Card style={{marginTop: 10}}>
        <RowBetween>
          <Icon name="person" color={colors.secondary} size={30} />

          <Text isCenter color={colors.bgColor}>
            {user?.displayName}
          </Text>
        </RowBetween>
      </Card>
      <Card style={{marginTop: 10}}>
        <RowBetween>
          <Icon name="email" color={colors.secondary} size={30} />
          <Text isCenter color={colors.bgColor}>
            {user?.email}
          </Text>
        </RowBetween>
      </Card>
    </Container>
  );
};

export default Profile;
const styles = StyleSheet.create({
  avatar: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    borderRadius: 250 / 2,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
});
