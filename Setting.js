import React, { Component } from 'react';

import {
  Animated,
  StyleSheet,
  Platform,
  AppRegistry,
  Text,
  AlertIOS,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  PushNotificationIOS,
  Linking,
  ActivityIndicator,
  View,
  Image,
} from 'react-native';
import {Login} from './Login';
import State from './state';
import About from './About';
import welcomest from './welcomest';
import ContactInfos from './ContactInfos';
import Icon from 'react-native-vector-icons/Ionicons';
import Cache from './Cache';
import Safe from './Safety/index';
const PROFILE_WIDTH = 90;
export default class Setting extends Component {

  static route = {
    navigationBar: {
      visible: false,
    },
  };
  constructor(props) {
        super(props);
		this.state = {
		  img:{uri: data.data.domain.slice(0,-6)+data.data.photo.slice(2)},
		  scrollY: new Animated.Value(0),
		  datas:{},
		  statu:false,
		  fadeAnim: new Animated.Value(0),
		  loaded: false,
		  navBarBackgroundOpacity:0,
	  };
    }
  componentDidMount() {



	}


  toQueryString(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
      var val = obj[key];
      if (Array.isArray(val)) {
        return val.sort().map(function (val2) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
        }).join('&');
      }

      return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
  }


  _exits(){
    var that = this;
    fetch('' + data.data.domain + '/index.php?app=Im&m=User&a=mobileInfo&access_token=' + data.data.token + '', {
       method: 'POST',
       headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: this.toQueryString({
            'token': '1',
            'type': 1
       })
     })
     .then(function (response) {
       return response.json();
     })
     .then(function (result) {
      console.log(result);
      if(result.statu == 1){

      }

     })
     .catch((error) => {

     })

     storage.clearMap();
     storage.remove({
       key: 'loginState'
     });
     storage.remove({
       key: 'password'
     });
     PushNotificationIOS.abandonPermissions();
     const {navigator} = that.props;
         navigator.resetTo({
           component: Login,
           name: 'Login'
             });


	}


  _state() {
        var { navigator } = this.props;
        if(navigator) {

            navigator.push({
                name: 'State',
                component: State,

            })

        }
    }

  _about() {
        var { navigator } = this.props;
        if(navigator) {

            navigator.push({
                name: 'About',
                component: About,

            })

        }
    }


 _myinfo(){
    const { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'ContactInfos',
                component: ContactInfos,
        params: {
          id: data.data.name,
          uid:data.data.uid,
        }
            })
        }
  }



  newb(){
    var { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'welcomest',
                component: welcomest
            })
        }
  }


  safe(){
    var { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'Safe',
                component: Safe
            })
        }
  }



  clearCache(){


    var { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'Cache',
                component: Cache
            })
        }
  }


  render() {
    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT - NAVBAR_HEIGHT],
      outputRange: [1, 0],
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 100],
    });
    const imageScale = this.state.scrollY.interpolate({
      inputRange: [-100, 0, 100],
      outputRange: [2.5, 1, 1],
      extrapolate: 'clamp',
    });
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [-1, -200],
    });

    this.state.navBarBackgroundOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT - NAVBAR_HEIGHT - 1, HEADER_HEIGHT - NAVBAR_HEIGHT],
      outputRange: [0, 0, 1],
    });



    const profileTranslateY = this.state.scrollY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [1, 0, -0.8],
    });
    const profileTranslateX = this.state.scrollY.interpolate({
      inputRange: [-1, 0, 170, 171],
      outputRange: [0, 0, -PROFILE_WIDTH/8, -PROFILE_WIDTH/8],
    });
    const profileScale = this.state.scrollY.interpolate({
      inputRange: [-1, 0, 170, 171],
      outputRange: [1, 1, 0.6, 0.6],
      extrapolate: 'clamp',
    });
    const titleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 140, 170],
      outputRange: [0, 0, 1],
    });
    const titleTranslate = this.state.scrollY.interpolate({
      inputRange:  [-1,  0, 150, 180, 181],
      outputRange: [0, 0,  0,   0,   0],
      extrapolate: 'clamp',
    });
    return (
      <View style={{flex: 1}}>

        <View style={[styles.fill, { overflow: 'hidden' }]}>
          <Animated.ScrollView
            scrollEventThrottle={16}
            style={styles.fill}
            contentContainerStyle={styles.content}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
              { useNativeDriver: false }
            )}
          >
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}><View style={{justifyContent:'center',alignItems:'center'}}><Text style={styles.name} allowFontScaling={false}>{data.data.name}</Text></View></View>
            <View style={{marginTop:30,}}>
                 <TouchableOpacity onPress={this._myinfo.bind(this)}>
                   <View style={{flexDirection:'row',height:50,justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',marginTop:15,}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>

                      <Text style={{marginLeft:10,fontSize:14,}}allowFontScaling={false}>我的信息</Text>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                       <Image source={require('./imgs/right.png')} style={{width:26,height:15,}} />
                    </View>
                   </View>
                 </TouchableOpacity>
            </View>
            <View style={{marginTop:15,}}>
                 <TouchableOpacity onPress={this.clearCache.bind(this)}>
                   <View style={{flexDirection:'row',height:50,justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',marginTop:15,}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>

                      <Text style={{marginLeft:10,fontSize:14,}}allowFontScaling={false}>清除缓存</Text>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                       <Image source={require('./imgs/right.png')} style={{width:26,height:15,}} />
                    </View>
                   </View>
                 </TouchableOpacity>
            </View>
            <View>
                 <TouchableOpacity onPress={this._state.bind(this)}>
                   <View style={{flexDirection:'row',height:50,justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',marginTop:1,}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>

                      <Text style={{marginLeft:10,fontSize:14,}}allowFontScaling={false}>特别声明</Text>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                       <Image source={require('./imgs/right.png')} style={{width:26,height:15,}} />
                    </View>
                   </View>
                 </TouchableOpacity>
            </View>
            <View >
                 <TouchableOpacity onPress={this._about.bind(this)}>
                   <View style={{flexDirection:'row',height:50,justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',marginTop:1,}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>

                      <Text style={{marginLeft:10,fontSize:14,}}allowFontScaling={false}>关于</Text>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                       <Image source={require('./imgs/right.png')}  style={{width:26,height:15,}}/>
                    </View>
                   </View>
                 </TouchableOpacity>
            </View>
            <View >
                 <TouchableOpacity onPress={this.newb.bind(this)}>
                   <View style={{flexDirection:'row',height:50,justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',marginTop:1,}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>

                      <Text style={{marginLeft:10,fontSize:14,}}allowFontScaling={false}>新版本介绍</Text>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                       <Image source={require('./imgs/right.png')}  style={{width:26,height:15,}}/>
                    </View>
                   </View>
                 </TouchableOpacity>
            </View>
            <View >
                 <TouchableOpacity onPress={this.safe.bind(this)}>
                   <View style={{flexDirection:'row',height:50,justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',marginTop:1,}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>

                      <Text style={{marginLeft:10,fontSize:14,}}allowFontScaling={false}>账号与安全</Text>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                       <Image source={require('./imgs/right.png')}  style={{width:26,height:15,}}/>
                    </View>
                   </View>
                 </TouchableOpacity>
            </View>
            <View >
                 <TouchableOpacity onPress={()=>Linking.canOpenURL('https://itunes.apple.com/us/app/lin-sheng-guan-jia-linksame/id1191391421?mt=8').then(supported => {
           if (supported) {
               Linking.openURL('https://itunes.apple.com/us/app/lin-sheng-guan-jia-linksame/id1191391421?mt=8');
           } else {
              console.log('无法打开该URI: ' + this.props.url);
           }
        })}>
                   <View style={{flexDirection:'row',height:50,justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',marginTop:1,}}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>

                      <Text style={{marginLeft:10,fontSize:14,}}allowFontScaling={false}>给我评分</Text>
                    </View>
                    <View style={{alignItems:'center', justifyContent:'center'}}>
                       <Image source={require('./imgs/right.png')}  style={{width:26,height:15,}}/>
                    </View>
                   </View>
                 </TouchableOpacity>
            </View>

            <TouchableHighlight onPress={this._exits.bind(this)} underlayColor="#1a5fd4" style={{marginLeft:10,marginRight:10,marginTop:20,marginBottom:20, borderWidth:1,borderColor:'#ececec',borderRadius:5,paddingTop:10,paddingBottom:10, justifyContent:'center',alignItems:'center',backgroundColor:'#4385f4'}}>
            <View style={{borderRadius:5, justifyContent:'center',alignItems:'center',}}>
                <Text style={{fontSize:18, color:'#fff'}} allowFontScaling={false}>退出登录</Text>
            </View>
            </TouchableHighlight>


          </Animated.ScrollView>

          <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslate }] }]} pointerEvents="none">
            <Animated.Image
              style={[styles.image, { opacity: imageOpacity, transform: [{ translateY: imageTranslate }, { scale: imageScale } ] }]}

              source={require('./imgs/head.jpg')}
            />
          </Animated.View>

          <Animated.View style={[
            styles.profile,
            { transform: [{ translateY: profileTranslateY }, { translateX: profileTranslateX }, { scale: profileScale }] }
          ]}>
            <Image
              resizeMode="cover"
              style={styles.profileImage}
              source={this.state.img}
            />
          </Animated.View>

          <View style={styles.navbar}>
            <Animated.View style={[styles.navbarBackground, { opacity: this.state.navBarBackgroundOpacity }]} />

            <View style={[StyleSheet.absoluteFill, {flexDirection: 'row', alignItems: 'center'}]}>


              <Animated.View pointerEvents="none" style={[styles.titleContainer, {opacity: titleOpacity, transform: [{ translateY: titleTranslate }] }]}>
                <View style={{flex:1,paddingTop:0,justifyContent:'center',alignItems:'flex-start',}}>
                    <View style={{marginLeft:25,width: 30, height: 30,borderRadius:15,overflow:'hidden',borderWidth:1,borderColor:'#fff'}}>
                      <Image source={this.state.img} style={{width: 30, height: 30,}} />
                    </View>
                </View>
                <View style={{flex:1}}>
                <Text style={styles.title} allowFontScaling={false}>
                  {data.data.name}
                </Text>
                </View>
                <View style={{flex:1}}></View>
              </Animated.View>

              <View style={styles.rightButton} />
            </View>
          </View>
        </View>


      </View>
    );
  }
}

const HEADER_HEIGHT = 170;
const NAVBAR_HEIGHT = 65;

const styles = StyleSheet.create({
  row: {
    padding: 10,
    margin: 10,
    backgroundColor: '#eee',
  },
  fill: {
    flex: 1,
    backgroundColor: '#f5f5f5',

  },
  image: {
    height: HEADER_HEIGHT,
    width:Dimensions.get('window').width,
  },
  header: {
    overflow: 'hidden',
    position: 'absolute',
    top: -HEADER_HEIGHT - HEADER_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: '#4385f4',
    height: HEADER_HEIGHT + HEADER_HEIGHT + HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT + HEADER_HEIGHT,
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: NAVBAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarBackground: {
    backgroundColor: '#4385f4',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  profile: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    position: 'absolute',
    top: HEADER_HEIGHT - 30,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: PROFILE_WIDTH,
    height: PROFILE_WIDTH,
  },
  content: {
    backgroundColor: '#f5f5f5',
    paddingTop: HEADER_HEIGHT,
  },
  name: {
    backgroundColor: 'transparent',
    marginTop: 16,
    marginBottom: 16,
    fontSize:16,

  },
  backButton: {
    width: 20,
    height: 20,
    marginLeft: 16,
    tintColor: 'white',
  },
  rightButton: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
  titleContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,
  },
   loading: {
	backgroundColor: 'gray',
	height: 80,
	width: 100,
	borderRadius: 10,
	justifyContent: 'center',
	alignItems: 'center',

  },

  loadingTitle: {
	marginTop: 10,
	fontSize: 14,
	color: 'white'
  },
});
