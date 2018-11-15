/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} from 'react-native';

import Toast from 'rntoast';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          This is my first package !
        </Text>
        <Text style={styles.instructions}>
          This component has suport iPhoneX !
        </Text>
        <TouchableHighlight onPress={()=>
          Toast.show({
            content: 'This is the default Toast.',
          })
        }
        style={{marginTop: 10}}
        >
          <Text>DEFAULT</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>
          Toast.show({
            content: 'This Toast with button',
            duration: 0,
            shadow: true,
            animation: false,
            hideOnPress: false,
            delayShow: 0,
            confirm: false
          })
        }
        style={{marginTop: 10}}
        >
          <Text>With Button</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>
          Toast.show({
            content: 'Use type to change colors,just suport success/info/error/warning/default',
            duration: 0,
            shadow: true,
            animation: false,
            hideOnPress: false,
            delayShow: 0,
            type: 'info',
            confirm: false
          })
        }
        style={{marginTop: 10}}
        >
          <Text>Info Toast</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>
          Toast.show({
            content: <View style={styles.toastView}>
              <Text>use image in Toast</Text>
              <Image source={require('example/Images/example.png')} style={styles.image} />
            </View>,
            containerStyle: {
              justifyContent: 'center',
              alignItems: 'center',
            },
            shadow: true,
            animation: false,
            hideOnPress: false,
            delayShow: 0,
            confirm: false
          })
        }
        style={{marginTop: 10}}
        >
          <Text>Image Toast</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=>
          Toast.show({
            content: <View style={styles.toastView}>
              <Text>use image in Toast</Text>
              <Image source={require('example/Images/example.png')} style={styles.image} />
            </View>,
            containerStyle: {
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            },
            confirmStyle: {marginTop: 20, marginLeft: 0},
            duration: 0,
            shadow: true,
            animation: false,
            hideOnPress: false,
            delayShow: 0,
            confirm: false
          })
        }
        style={{marginTop: 10}}
        >
          <Text>with image button</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  toastView: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
