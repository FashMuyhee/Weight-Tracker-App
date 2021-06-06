import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import Stack from './src/navigation/Stack';
import {UserContextProvider} from './src/store/UserContext';
import colors from './src/utils/colors';

const App = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <Stack />
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;
