import firebase from '../config/firebase';
import login from './login.js';
import home from './home.js';
import styles from '../theme/theme.js';

import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  AlertIOS,
  TouchableOpacity
} from 'react-native';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

//click on method, state will be showed in the console
  register(){
    var state = this;
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function() {
    // Login successful
    state.props.navigator.push({component: home});
    }, function(error) {
    AlertIOS.alert(error.message)
    });
  }

  login(){
    this.props.navigator.push({component: login});
  }

  render(){
    return(
      //could only return one node
      //justifyContent moves the component to the center area
      <View style= {[styles.container, styles.center]} >
        <Text>Meals Hunter</Text>
        <TextInput
          style={styles.textInput}
          placeholder = "Email"
          //the input is "email", then we associate it to the state's email
          onChangeText={(email) => this.setState({email: email})}
          value={this.state.email}/>
        <View style={styles.line} />
        <TextInput
          style={styles.textInput}
          placeholder = "Password"
          secureTextEntry = {true}
          onChangeText={(password) => this.setState({password: password})}
          value={this.state.password}/>
        <View style={styles.line} />
        <TouchableOpacity style={styles.btn} onPress = {this.register.bind(this)}>
          <Text style={ styles.text }>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress = {this.login.bind(this)}>
          <Text style={ styles.text }>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//for the onPress method:
//the first this reference to this whole enviroment, then find the
//submit method, then bind the button to that method
//the third this bind data structures to functions
export default Register;
