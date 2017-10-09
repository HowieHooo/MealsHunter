import firebase from '../config/firebase';
import login from './login.js';
import home from './home.js';

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
      <View style= {{flex: 1, justifyContent: 'center'}} >
        <Text>Meals Hunter</Text>
        <TextInput
          style = {{height: 40}}
          placeholder = "Email"
          //the input is "email", then we associate it to the state's email
          onChangeText={(email) => this.setState({email: email})}
          value={this.state.email}/>
        <TextInput
          style = {{height: 40}}
          placeholder = "Password"
          secureTextEntry = {true}
          onChangeText={(password) => this.setState({password: password})}
          value={this.state.password}/>
        <Button
        //the first this reference to this whole enviroment, then find the
        //submit method, then bind the button to that method
        //the third this bind data structures to functions
          onPress={this.register.bind(this)}
          title="Register"/>
        <TouchableOpacity onPress = {this.login.bind(this)}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Register;
