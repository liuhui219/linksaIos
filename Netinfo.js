import React, {Component} from 'react';
import {
  StyleSheet,
  AppRegistry,
  Text,
  TouchableOpacity,
  View,
  Image,
  NetInfo,
  ListView,
  InteractionManager,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
  ToastAndroid,
  DatePickerAndroid,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Netinfos from './Netinfos';

export default class Netinfo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
            isConnected:true,
		};
	}

	componentDidMount() {
		var that=this;
		NetInfo.isConnected.addEventListener('change',function(isConnected){
			that.setState({isConnected:isConnected})
		});

		NetInfo.isConnected.fetch().done(
			(isConnected) => { this.setState({isConnected:isConnected}) }
		);
	}


	infos(){
		const { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'Netinfos',
                component: Netinfos,
            })
        }
	}



	render() {
			return (
			  <View>
			    {this.state.isConnected ? <View></View> : <TouchableOpacity  onPress={this.infos.bind(this)}><View style={{height:50,alignItems:'center',paddingLeft:15,paddingRight:15,flexDirection:'row', backgroundColor:'#999',justifyContent:'space-between',}}>
				   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
				    <Icon name="logo-rss" color="#F44352"size={22}  />
					<Text style={{marginLeft:10,fontSize:15,color:'#fff'}} allowFontScaling={false}>
					   网络请求失败,请检查网络设置。
					</Text>
				   </View>
					<Icon name="ios-arrow-forward" color="#fff"size={27}  />
				 </View>
				</TouchableOpacity>}
			  </View>
			)
	}
}
