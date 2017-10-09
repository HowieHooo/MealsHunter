import firebase from '../config/firebase';

import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

class Home extends Component {
  render() {
    return(
      <View style= {{flex : 1, justifyContent: 'center'}}>
        <Text>Home</Text>
      </View>
    );
  }
}
export default Home;
