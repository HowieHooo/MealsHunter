import firebase from '../config/firebase';
import home from './home.js';
import register from './register.js';
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

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

//if the user has already login just now, the user can skip the login page
  componentDidMount() {
    var state = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        state.props.navigator.push({ component: home });
      }
    });
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
      <View style={[styles.container, styles.center, styles.red]} >
        <Icon color="#ff1" name="lemon-o" size={50} />
        <Text style={styles.logo}> MealsHunter</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Please type in your email"
          onChangeText={(email) => this.setState({email: email})}
          value={this.state.email}/>
        <TextInput
          style={styles.textInput}
          placeholder="Please type in your password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password: password})}
          value={this.state.password}/>
        <TouchableOpacity style={styles.clearBtn} onPress={this.login.bind(this)}>
          <Text style={ styles.text, styles.whiteText }>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.register.bind(this)}>
          <Text style={ styles.whiteText }>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Login;
