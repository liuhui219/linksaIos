'use strict';

import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  InteractionManager,
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppMain from './main';
import {Login,data} from './Login';
import welcome from './welcome';
var {height, width} = Dimensions.get('window');

class Splash extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
   var {navigator} = this.props;

   storage.load({
      key: 'welcome',
      autoSync: true,
      syncInBackground: true
      }).then(ret => {

      if(ret.datas == '123'){
      storage.load({
      key: 'loginState',
      autoSync: true,
      syncInBackground: true
      }).then(ret => {
        console.log(ret)
        global.data=ret.data
        global.PUSHDATA=ret.PUSHDATA

          InteractionManager.runAfterInteractions(() => {

          navigator.resetTo({
            component: AppMain,
            name: 'AppMain'
          });
          SplashScreen.hide();
          });

      }).catch(err => {

       if(err.message.ret==undefined){

          InteractionManager.runAfterInteractions(() => {

          navigator.resetTo({
            component: Login,
            name: 'Login'
          });
          SplashScreen.hide();
          });

       }
      })
       }else{
       	   InteractionManager.runAfterInteractions(() => {

          navigator.resetTo({
            component: welcome,
            name: 'welcome'
          });
          SplashScreen.hide();
          });

       }

      }).catch(err => {

       if(err.message.ret==undefined){

          InteractionManager.runAfterInteractions(() => {

          navigator.resetTo({
            component: welcome,
            name: 'welcome'
          });
          SplashScreen.hide();
          });

       }
      })






  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    return (
      <View style={{flex:1}}>

      </View>
    );
  }
}
export default Splash;
