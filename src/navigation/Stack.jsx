import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Landing from '../screen/landing';
import TabNav from './Tab';
import colors from '../utils/colors';
import SignIn from '../screen/auth/sign-in';
import SignUp from '../screen/auth/sign-up';
import {UserContext} from '../store/UserContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

export default StackNav = () => {
  const {user} = useContext(UserContext);

  const logout = async () => {
    await auth().signOut();
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: 'white',
      }}
      initialRouteName="sign-in">
      {user ? (
        <Stack.Screen
          name="MainApp"
          component={TabNav}
          options={() => ({
            headerShown: true,
            headerLeft: () => null,
            headerTitleAlign: 'center',
            headerTitle: 'Weight Tracker',
            headerRight: () => (
              <Icon
                size={30}
                name="logout"
                color={colors.secondary}
                style={{marginRight: 10}}
                onPress={logout}
              />
            ),
          })}
        />
      ) : (
        <>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={() => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="sign-in"
            component={SignIn}
            options={() => ({
              headerShown: false,
            })}
          />
          <Stack.Screen
            name="sign-up"
            component={SignUp}
            options={() => ({
              headerShown: false,
            })}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
