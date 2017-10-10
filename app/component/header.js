import styles from '../theme/theme.js';
import Icon from 'react-native-vector-icons/FontAwesome'

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class Header extends Component {
  render() {
    return(
      <View>
        <View style= {styles.header}>
          <TouchableOpacity onPress = {this.props.left} style={styles.left}>
            <Icon color="#fff" name={this.props.leftIcon} size={20} />
          </TouchableOpacity>
          <Text style={ styles.logo}>{this.props.title}</Text>
          <TouchableOpacity style={styles.right} >
            <Text style={ styles.text}></Text>
          </TouchableOpacity>
        </View>
        <View style= {styles.line} />
      </View>
    );
  }
}

export default Header;
