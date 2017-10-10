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
const deviceHeight = Dimensions.get('window').height;

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView
} from 'react-native';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 'https://firebasestorage.googleapis.com/v0/b/mealhunter-71d48.appspot.com/o/default.jpg?alt=media&token=9f0fff61-5905-400f-8a10-222b2b07ac9b',
      place: {
        name: '',
        adress: '',
        lat: '',
        lng: '',
      },
      lat: '',
      lng: '',
      nearby: []
    };
  }


  componentDidMount(){
    this.getLocations();
  }

  getLocations(){
    navigator.geolocation.getCurrentPosition(
      (position) =>{
        const coords = position.coords.latitude + ',' + position.coords.longitude
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + coords + '&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyAN6P_a6v3ZuXQYEa7RjLivMogbK7ck3Jo'
        fetch(url, {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({nearby : responseData.results })
        })
      }
    )
  }
//first use imagepicker to call the native prompts, then use imagreresizer to resize the image and then use image fetch blob to upload the image into firebase
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
        <Header title="Post" left={this.back.bind(this)} leftIcon={'chevron-left'}/>
        <View style={ styles.center }>
          <TouchableOpacity onPress = {this.photo.bind(this)}>
            <Image source={{uri: this.state.image}}  style={{ width: deviceWidth, height: (deviceWidth*.5)}}/>
          </TouchableOpacity>
          <Text style={{marginTop: 10, margin: 10}}>{this.state.place.name}</Text>
          <View style={styles.line} />
          <ScrollView style= {{height: deviceHeight*0.25, width: deviceWidth-10}} >
            {Object.keys(this.state.nearby).map((key) => {
              var store = {
                address: this.state.nearby[key].vicinity,
                lat: this.state.nearby[key].geometry.location.lat,
                lng: this.state.nearby[key].geometry.location.lng,
                name: this.state.nearby[key].name
              }
              return(
                <TouchableOpacity style={{padding : 10, margin: -1}} onPress={(place) =>  this.setState({place: store})}>
                  <Text style={styles.text}>{this.state.nearby[key].name}</Text>
                  <Text style={styles.text}>{this.state.nearby[key].vicinity}</Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
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
