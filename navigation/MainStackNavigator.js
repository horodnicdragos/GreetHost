import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import FlightDetailsScreen from '../screens/FlightDetailsScreen';

const navigationConfig = {
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: Colors.backgroundColor,
      borderBottomWidth: 0,
    },
  },
}

const MainStackNavigator = createStackNavigator({
  Home: HomeScreen,
  FlightDetails: FlightDetailsScreen
}, navigationConfig);

export default MainStackNavigator;
