import React from 'react';
import {
  View,
	StyleSheet,
  Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
  PushNotificationIOS,
	ScrollView,
	ActivityIndicator,
	InteractionManager,
	Dimensions,
	ToastAndroid,
  Animated,
  AppState,
	BackAndroid,
  Vibration,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import Approval from './Approval';
import Operation from './Operation';
import PassState from './PassState';
import News from './News';
import Toast from '@remobile/react-native-toast';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
var array = [];
var aa=[];
export default class Push extends React.Component {

    constructor(props) {
        super(props);

    		this.state = {
            title:'',
            content:'',
            top: new Animated.Value(-120),
            appState: AppState.currentState,
    	  };
    }


    componentDidMount() {
      AppState.addEventListener('change', this._handleAppStateChange.bind(this));
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
    }
    _handleAppStateChange(appState){
      this.setState({appState:appState});
    }
    componentWillMount() {
      PushNotificationIOS.addEventListener('notification', this.localNotification.bind(this));
      PushNotificationIOS.requestPermissions();
    }

    localNotification(notification) {
      var { navigator } = this.props;
        PushNotificationIOS.setApplicationIconBadgeNumber(notification.getBadgeCount()-1);
        const data = notification.getData();
        Vibration.vibrate([0, 1000]);
        if(this.state.appState == 'active'){
          Animated.timing(
            this.state.top,
            {
              toValue: 0,
              duration: 500,
            },
            ).start();
            this.timer = setTimeout(
  		        () => {
                Animated.timing(
                  this.state.top,
                  {
                    toValue: -120,
                    duration: 500,
                  },
                  ).start();
                  clearTimeout(this.timer);
              },7000);
              this.setState({title:data.msg.title,content:data.msg.content})
        }else{

        if(data.msg.type == 3 ){

						 navigator.push({
							name: 'Approval',
							component: Approval
						 })
					 }
					 if(data.msg.type == 2){

						 navigator.push({
							name: 'Operation',
							component: Operation
						 })
					 }
					 if(data.msg.type == 1){

						 navigator.push({
							name: 'News',
							component: News
						 })
					 }

      }

      }

      close(){
        Animated.timing(
          this.state.top,
          {
            toValue: -120,
            duration: 500,
          },
          ).start();
      }







    render() {
           return (
                <Animated.View style={{flex:1,top:this.state.top,flexDirection:'column',position:'absolute',left:0,backgroundColor:'#4385f4'}}>

        					<View style={{flex:1,flexDirection:'row',backgroundColor:'#4385f4',width:Dimensions.get('window').width,paddingTop:30,paddingBottom:20,justifyContent:'center',alignItems:'flex-start'}}>
                     <View style={{marginLeft:15,marginTop:5,}}>
                        <Image source={require('./imgs/pushlogo.png')} style={{width: 35, height: 32,}} />
                     </View>
                     <View style={{marginLeft:15,marginTop:5,flex:1}}>
                        <Text style={{fontSize:14,color:'#fff'}} numberOfLines={1} allowFontScaling={false}>{this.state.title}</Text>
                        <Text style={{fontSize:12,color:'#fff',paddingTop:5,lineHeight:15}} numberOfLines={3} allowFontScaling={false}>{this.state.content}</Text>
                     </View>
                     <TouchableHighlight underlayColor="transparent" onPress={this.close.bind(this)} style={{paddingRight:15,paddingLeft:10,paddingTop:14}}>
                        <Icon name="ios-close-circle-outline" color="#fff"size={18}  />
                     </TouchableHighlight>

        					</View>
	             </Animated.View>
           	)
	}
}
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    flexDirection: 'column',
	backgroundColor:'#fafafa',
  },
  card: {
    height:65,
    paddingTop:20,
	backgroundColor:'#4385f4',
	flexDirection:'row'
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
	footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },

    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
