import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import NavigationService from './utils/navigationService';
import { store } from './createStore';

const App = () => (
  <Provider store = { store }>
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <AppNavigator ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef)
      }}/>
    </View>
  </Provider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
