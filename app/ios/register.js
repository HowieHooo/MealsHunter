import firebase from '../config/firebase';
import login from './login.js';
import home from './home.js';
import styles from '../theme/theme.js';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <View style={[styles.container, styles.center, styles.red]} >
        <Icon color="#ff1" name="lemon-o" size={50} />
        <Text style={styles.logo}> MealsHunter</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Please type in your email"
          //the input is "email", then we associate it to the state's email
          onChangeText={(email) => this.setState({email: email})}
          value={this.state.email}/>
        <TextInput
          style={styles.textInput}
          placeholder="Please type in your password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password: password})}
          value={this.state.password}/>
        <TouchableOpacity style={styles.clearBtn} onPress={this.register.bind(this)}>
          <Text style={ styles.text, styles.whiteText }>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.login.bind(this)}>
          <Text style={ styles.whiteText }>Login</Text>
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
