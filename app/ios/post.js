import firebase from '../config/firebase';
import Header from '../component/header';
import styles from '../theme/theme.js';
var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://firebasestorage.googleapis.com/v0/b/mealhunter-71d48.appspot.com/o/t440x300.jpg?alt=media&token=f150c8fc-3eb3-43b8-b4d3-d965f2e22bb2',
      place: ''
    };
  }

//create a ref called food and push the image and place under it as a object
  post(){
    firebase.database().ref('food').push({image: this.state.image, place: this.state.place});
    //return to the lastest page
    this.props.navigator.pop();
  }

  back(){
    //return to the last page
    this.props.navigator.pop();
  }

  render() {
    return (
      <View >
        <Header title="Post" left={this.back.bind(this)} leftText={'Back'}/>
        <View style={ styles.center }>
          <Image source={{uri: this.state.image}}  style={{ width: deviceWidth-10  , height: (deviceWidth*.6), borderRadius: 10}}/>
          <TextInput
            style={styles.textInput}
            //the length of the placeholder will be the same length that you can see what your typing?
            placeholder="Where is this delicious food?"
            onChangeText={(place) => this.setState({place: place})}
            value={this.state.place}/>
          <View style={styles.line} />
          <TouchableOpacity style={ styles.btn } onPress={this.post.bind(this)}>
            <Text style={ styles.text }>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Post;
