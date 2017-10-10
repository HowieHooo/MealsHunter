import firebase from '../config/firebase';
import Header from '../component/header';
import styles from '../theme/theme.js';
import post from './post';
import map from './map';
import Dimensions from 'Dimensions';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      food: [],
    }
  }
//this means every time you acess this page, what you want to do
  componentDidMount(){
    this.getFood()
  }

//once means we only need to interact once with database when user access this page
//we first get the food list out as snap, then loop it and put the data into the items array
//because old data stores first and will show first, we need to reverse it.
  getFood(){
    firebase.database().ref('food').on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        var item = child.val();
        items.push(item);
      });
      items = items.reverse();
      this.setState({food: items });
    });
  }

  map(){
    this.self.props.navigator.push({
      component: map,
      passProps: { place: this.place.place }
    });
  }

  left(){
    this.props.navigator.push({component: post });
  }
  render() {
    return(
      <View style= {styles.container}>
        <Header title =  "Meals Hunter" left ={this.left.bind(this)} leftIcon={'camera-retro'}/>
        <ScrollView>
          {Object.keys(this.state.food).map((key) => {
            return(
              <TouchableOpacity onPress={this.map.bind({self: this, place: this.state.food[key]})}>
                <Image source={{uri: this.state.food[key].image}}  style={{ width: deviceWidth, height: (deviceWidth*.5)}}/>
                <Text style={styles.text}>{this.state.food[key].place.name}</Text>
                <Text style={styles.text}>{this.state.food[key].place.address}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}
export default Home;
