
import React, {Component} from 'react';
import {
    StyleSheet,
    Navigator,
    StatusBar,
    BackAndroid,
    InteractionManager,
    View,
    Platform,
    AsyncStorage,
} from 'react-native';

import Splash from './Splash';
import welcome from './welcome';
import SplashScreen from 'react-native-splash-screen';
import Storage from 'react-native-storage';
export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19
var _navigator;
global.storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true
});


export default class Root extends Component {
    constructor(props) {
        super(props);
        this.renderScene = this.renderScene.bind(this);

        this.state={num:1,}
    }

    componentDidMount() {

    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    renderScene(route, navigator) {
        let Component = route.component;
        _navigator = navigator;
        return (
                <Component navigator={navigator} {...route.params} route={route} />
                );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {


        return (
                <View style={{flex: 1}}>
                      <StatusBar
                        animated={true}
                        barStyle="light-content"
                        hidden={false}
                        showHideTransition={'fade'}
                        style={{height: 100}}
                      />
                      <Navigator
                        ref='navigator'
                        style={styles.navigator}
                        configureScene={this.configureScene}
                        renderScene={this.renderScene}
                        initialRoute={{
                          component: Splash,
                          name: 'Splash'
                        }}
                      />
                </View>
                );
    }
}
let styles = StyleSheet.create({
   navigator: {
      flex: 1,
   }
});
