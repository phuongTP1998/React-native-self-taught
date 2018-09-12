import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import SplashScreen from './SplashScreen';
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import { primaryColorGreen, primaryColorRed } from '../styles'

import LoginScreen from './LoginScreen';

import TabMenu from './TabMenu';
import TabOrder from './TabOrder';
import TabHistory from './TabHistory';
import TabInfo from './TabInfo';

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'

const configure = configureStore()

const BottomNavigation = createBottomTabNavigator({
  Menu: TabMenu,
  Order: TabOrder,
  History: TabHistory,
  Info: TabInfo
}, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Menu') {
          iconName = `cutlery`;
        } else if (routeName === 'Order') {
          iconName = `shopping-cart`;
        } else if (routeName === 'History') {
          iconName = `history`;
        } else if (routeName === 'Info') {
          iconName = `info-circle`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <View>
          <Icon name={iconName} size={25} color={tintColor} />
          {routeName === 'Order' &&
            <View style={{
              position: 'absolute',
              right: -15,
              backgroundColor: primaryColorRed,
              width: 20,
              height: 20,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ color: 'white', fontSize: 12 }}>1</Text>
            </View>}
        </View>;
      },
    }),
    tabBarOptions: {
      activeTintColor: primaryColorGreen,
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white'
      }
    },
  })

const SwitchNavigation = createSwitchNavigator({
  SplashScreen: SplashScreen,
  HomeScreen: BottomNavigation,
  LoginScreen: LoginScreen,
})


class App extends Component {
  state = {}
  render() {
    return (
      <Provider store={configure.store}>
        <PersistGate loading={null} persistor={configure.persistor}>
          <SwitchNavigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;