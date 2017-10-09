import firebase from '../config/firebase';
import home from './home.js';
import register from './register.js';
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

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

//click on method, state will be showed in the console
  login(){
    var state = this;
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function() {
    // Login successful
    state.props.navigator.push({component: home});
    }, function(error) {
    AlertIOS.alert(error.message)
    });
  }

  register(){
    this.props.navigator.push({component: register});
  }

  render(){
    return(
      //could only return one node
      //justifyContent moves the component to the center area
      <View style= {[styles.container, styles.center]} >
        <Text style = {styles.logo}>Meals Hunter</Text>
        <TextInput
          style={styles.textInput}
          placeholder = "Please type in your email"
          //the input is "email", then we associate it to the state's email
          onChangeText={(email) => this.setState({email: email})}
          value={this.state.email}/>
        <View style={styles.line} />
        <TextInput
          style={styles.textInput}
          placeholder = "Please type in your password"
          secureTextEntry = {true}
          onChangeText={(password) => this.setState({password: password})}
          value={this.state.password}/>
        <View style={styles.line} />
        <TouchableOpacity style={styles.btn} onPress={this.login.bind(this)}>
          <Text style={ styles.text }>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress = {this.register.bind(this)}>
          <Text style={ styles.text }>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;
