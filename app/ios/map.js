'use strict';
import React, {Component} from 'react';
import firebase from '../config/firebase';
const styles = require('../theme/theme')
import MapView from 'react-native-maps';
import ReactNative from 'react-native';
var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

const {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  AlertIOS,
  Button,
} = ReactNative;

class Map extends Component {

  onBack(){
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: this.props.place.lat,
            longitude: this.props.place.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker
            coordinate={{
              latitude: this.props.place.lat,
              longitude: this.props.place.lng
            }}
            title={this.props.place.name}
            description={this.props.place.address}
          />
        </MapView>
        <TouchableOpacity style={ styles.btn } onPress={this.onBack.bind(this)} >
          <Text style={styles.text}> Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Map;
