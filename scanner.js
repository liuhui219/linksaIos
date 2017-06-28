import React, {Component} from 'react';
import {
  StyleSheet,
  AppRegistry,
  Text,
  TouchableOpacity,
  View,
  Image,
  NetInfo,
  Navigator,
  ListView,
  InteractionManager,
  TextInput,
  Alert,
  Dimensions,
  ScrollView,
  TouchableNativeFeedback,
  ToastAndroid,
  DatePickerAndroid,
  NativeModules,
  TouchableHighlight,
} from 'react-native';
import PassState from './PassState';
import Push from './Push';
var RNControlFlashlight = NativeModules.RNControlFlashlight;
import Icon from 'react-native-vector-icons/Ionicons';
import Barcode from 'react-native-smart-barcode';
import Webviewst from './Webviewst';
import scanner_info from './scanner_info';
export default class Netinfo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
            viewAppear:false,
            light:true,
            isshows:true,
      			issearch:false,
      			text:'',
		};
	}

	componentDidMount() {
		 this.timer = setTimeout(
		    () => {  this.setState({viewAppear:true,})
		 },1000)
	}

	componentWillUnmount () {
        this.timer && clearTimeout(this.timer);
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {

            navigator.pop();
                    }

    }

    on(){

    	this.setState({light:false,});
	    RNControlFlashlight.turnFlashlight(
	        "flashlightOn", // flashlightOn, flashlightOff
	        function errorCallback(results) {
	            console.log('JS Error: ' + results['errMsg']);
	        },
	        function successCallback(results) {
	            console.log('JS Success: ' + results['successMsg']);
	        }
	    );
	  }

	  off(){

	  	this.setState({light:true,});
	    RNControlFlashlight.turnFlashlight(
	        "flashlightOff", // flashlightOn, flashlightOff
	        function errorCallback(results) {
	            console.log('JS Error: ' + results['errMsg']);
	        },
	        function successCallback(results) {
	            console.log('JS Success: ' + results['successMsg']);
	        }
	    );
	  }

	_onBarCodeRead = (e) => {
        this._stopScan()
        if(e.nativeEvent.data.code.toLowerCase().indexOf("http://")!=-1 || e.nativeEvent.data.code.toLowerCase().indexOf("https://")!=-1 || e.nativeEvent.data.code.toLowerCase().indexOf("file://")!=-1){

        			var url=e.nativeEvent.data.code;
        			var { navigator } = this.props;
        			if(navigator) {
        				InteractionManager.runAfterInteractions(() => {
        				navigator.replace({
        					name: 'Webviewst',
        					component: Webviewst,
        					params: {
        						url: url
        					}
        				})
        				})
        			}
    		}else{
            var data=e.nativeEvent.data.code;
            var { navigator } = this.props;
            if(navigator) {
              InteractionManager.runAfterInteractions(() => {
              navigator.replace({
                name: 'scanner_info',
                component: scanner_info,
                params: {
                  data: data
                }
              })
              })
            }
      }
    }

    _startScan = (e) => {
        this._barCode.startScan()
    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }

    Trim(str)
         {
             return str.replace(/(^\s*)|(\s*$)/g, "");
     }


    _submit(text){
		var that = this;

		 if(this.Trim(text) == ''){
			 return false;
		 }else{

			var { navigator } = this.props;
			if(navigator) {
				InteractionManager.runAfterInteractions(() => {
				navigator.replace({
					name: 'scanner_info',
					component: scanner_info,
					params: {
						data: that.Trim(text)
					}
				})
				})
			}
		 }
	}

  _search(){

		this.setState({
			viewAppear:false,
			isshows:false,
			issearch:true,
		})
	}

	_scanner(){

		this.setState({
			viewAppear:true,
			isshows:true,
			issearch:false,
		})
	}



	render() {
			return (
			  <View style={{flex: 1, backgroundColor: 'black',}}>
                {this.state.viewAppear ? <Barcode style={{flex: 1, }}
                                                  ref={ component => this._barCode = component }
                                                  onBarCodeRead={this._onBarCodeRead}/> : null}
                <View style={{flex:1,position:'absolute',top:0,left:0,height:65,paddingTop:20, flexDirection:'row',width:Dimensions.get('window').width,justifyContent:'space-between'}}>

                    <View style={{justifyContent:'center',alignItems:'center',}}>
                       <TouchableOpacity onPress={this._pressButton.bind(this)}>
                         <View style={{justifyContent:'flex-start',alignItems:'center',paddingLeft:0,backgroundColor:'transparent',flexDirection:'row'}}>
                           <Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
                           <Text style={{color:'white',fontSize:16,marginLeft:-5,}}allowFontScaling={false}>返回</Text>
                         </View>
                       </TouchableOpacity>
                    </View>
                    {this.state.light ? <TouchableOpacity activeOpacity={1} onPress={this.on.bind(this)} style={{justifyContent:'center',alignItems:'flex-end',paddingRight:0,position:'absolute',right:75,top:24}}>
	                    <View style={{justifyContent:'flex-end',alignItems:'flex-end',backgroundColor:'transparent'}}>
	                         <Icon name="ios-flash-outline" color="#fff"size={36}  />
	                    </View>
                    </TouchableOpacity> : <TouchableOpacity activeOpacity={1} onPress={this.off.bind(this)} style={{justifyContent:'center',alignItems:'flex-end',paddingRight:0,position:'absolute',right:75,top:24}}>
	                    <View style={{justifyContent:'flex-end',alignItems:'flex-end',backgroundColor:'transparent'}}>
	                         <Icon name="ios-flash-outline" color="#de9c0e"size={36}  />
	                    </View>
                    </TouchableOpacity>}

                    {this.state.isshows ? <View style={{justifyContent:'center',alignItems:'center',marginRight:15}}>
      							   <TouchableOpacity activeOpacity={1} onPress={this._search.bind(this)}>
      								 <View style={{justifyContent:'flex-start',alignItems:'center',paddingLeft:0,backgroundColor:'transparent',flexDirection:'row'}}>
      								   <Icon name="ios-search-outline" color="#fff"size={28}  />
      								 </View>
      							   </TouchableOpacity>
      							</View> : <View style={{justifyContent:'center',alignItems:'center',marginRight:15}}>
      							   <TouchableOpacity activeOpacity={1} onPress={this._scanner.bind(this)}>
      								 <View style={{justifyContent:'flex-start',alignItems:'center',paddingLeft:0,backgroundColor:'transparent',flexDirection:'row'}}>
      								    <Image source={require('./imgs/scanners.png')} style={{width: 24, height: 24,}} />
      								 </View>
      							   </TouchableOpacity>
      							</View>}
                </View>
                {this.state.issearch ? <View style={{position:'absolute',top:50,left:30,flexDirection:'row',width:Dimensions.get('window').width-60,height:Dimensions.get('window').height-200,alignItems:'center',justifyContent:'center',}}>
      					    <View style={{flexDirection:'column',flex:1}}>
      					     <View style={{height:50}}>
      					      <TextInput
      						    underlineColorAndroid = 'transparent'
      							placeholder = '输入订单号查询'
      							placeholderTextColor = {'#666'}
      							onChangeText={(text) => this.setState({text})}
      							style={{paddingBottom:3,paddingTop:3,lineHeight:15,height:50, borderColor: '#666', borderWidth: 1,color:'#fff',flex:1,fontSize:18,paddingLeft:10,borderRadius:3}}/>
                               </View>
      						 <TouchableOpacity onPress={this._submit.bind(this,this.state.text)} activeOpacity={0.8} style={{width:Dimensions.get('window').width-60,alignItems:'center',justifyContent:'center',height:50,marginTop:30,}}>
      							 <View style={{width:Dimensions.get('window').width-60,alignItems:'center',justifyContent:'center',height:50, backgroundColor:'#222',borderRadius:3 }}>
      								 <Text style={{color:'#ccc',fontSize:20,}} allowFontScaling={false} adjustsFontSizeToFit={false}>查询</Text>
      							 </View>
      						 </TouchableOpacity>
      						</View>
      					  </View> : null}
                  <Push navigator = {this.props.navigator} {...this.props}/>
                <PassState navigator = {this.props.navigator} {...this.props}/>
              </View>
			)
	}
}
