import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screen/home';
import RecordWeight from '../screen/record-weight';
import Profile from '../screen/profile';
import colors from '../utils/colors';
import History from '../screen/history';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.secondary,
        inactiveTintColor: colors.primary,
        activeBackgroundColor: colors.primary,
        style: {
          backgroundColor: colors.bgColor,
          width: '90%',
          position: 'absolute',
          bottom: '1%',
          left: '5%',
          right: '5%',
          height: '7%',
          borderRadius: 50,
          elevation: 0,
          borderTopWidth: 0,
        },
        tabStyle: {
          borderRadius: 50,
        },
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={30} />,
        }}
      />
      <Tab.Screen
        name="record_weight"
        component={RecordWeight}
        options={{
          tabBarIcon: ({color}) => <Icon name="plus" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({color}) => <Icon name="history" color={color} size={26} />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
