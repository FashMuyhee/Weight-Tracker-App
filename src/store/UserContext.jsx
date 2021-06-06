import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

export const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <UserContext.Provider value={{user, initializing}}>
      {children}
    </UserContext.Provider>
  );
};
