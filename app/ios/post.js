import firebase from '../config/firebase';
import Header from '../component/header';
import styles from '../theme/theme.js';
import uploadImage from '../config/uploadImage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
import Dimensions from 'Dimensions';
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
const deviceWidth = Dimensions.get('window').width;

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
      image: 'https://firebasestorage.googleapis.com/v0/b/mealhunter-71d48.appspot.com/o/default.jpg?alt=media&token=9f0fff61-5905-400f-8a10-222b2b07ac9b',
      place: ''
    };
  }

photo(){
  var state = this
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob
  ImagePicker.showImagePicker({}, (response) => {
    if(!response.didCancel){
      const source = {uri: response.uri.replace('file://', ''), isStatic: true};
      ImageResizer.createResizedImage(source.uri, 500, 500, 'JPEG', 60).then((resizedImageUri) => {
        uploadImage(resizedImageUri)
          .then(url => state.setState({ image: url }))
          .catch(error => console.log(error))
      }).catch((err) => {
        console.log(err)
      });
    }
  });
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
          <TouchableOpacity onPress = {this.photo.bind(this)}>
            <Image source={{uri: this.state.image}}  style={{ width: deviceWidth, height: (deviceWidth*.5)}}/>
          </TouchableOpacity>
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
