/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import Login from './app/ios/login';

import React, { Component } from 'react';
import {
  NavigatorIOS
} from 'react-native';

export default class App extends Component<{}> {
  render() {
    return (
      <NavigatorIOS
        navigationBarHidden={true}
        initialRoute={{
          component: Login,
          title: 'Login',
        }}
        style={{flex: 1}}
      />
    );
  }
}
