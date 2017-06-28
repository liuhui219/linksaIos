import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	BackAndroid,
	Image,
} from 'react-native';
import PassState from './PassState';
import Token from './Token';
export default class Netinfos extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {id: '',uid:'',datas:{},img:''};
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
			return true;
        }
		return false;
    }
    componentDidMount() {

    }





    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',}}>
           <View style={styles.card}>
				  <View style={{flex:1,justifyContent:'center'}}>
							 <TouchableOpacity onPress={this._pressButton.bind(this)}>
								  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
										<Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
										<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false}>返回</Text>
								  </View>
							</TouchableOpacity>
				  </View>
				  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
							<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
										<Text style={{color:'white',fontSize:18}} allowFontScaling={false}>无网络连接</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
			</View>

			<View style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',}}>
				 <View style={{paddingLeft:15,paddingRight:15,}}>
				     <Text style={{fontSize:17,paddingTop:15,paddingBottom:15,}} allowFontScaling={false}>请设置你的网络</Text>
					 <View>
					    <Text style={{color:'#999',marginBottom:10,}} allowFontScaling={false}>1.打开设备的"系统设置" > "移动网络" > "数据网络"。</Text>
						<Text style={{color:'#999',marginBottom:10,}} allowFontScaling={false}>2.打开设备的"系统设置" > "WLAN"，"开启WLAN"后从中选择一个可用的热点链接。</Text>
					 </View>
				 </View>
				 <View style={{height:20,backgroundColor:'#ccc'}}></View>
				 <View style={{paddingLeft:15,paddingRight:15,}}>
				     <Text style={{fontSize:17,paddingTop:15,paddingBottom:15,}} allowFontScaling={false}>如果你已经连接Wi-Fi网络</Text>
					 <View>
					    <Text style={{color:'#999',marginBottom:10,}} allowFontScaling={false}>请确定你所连接的Wi-Fi网络已经连入互联网，或者咨询网络运营商。</Text>

					 </View>
				 </View>
			</View>
      <PassState navigator = {this.props.navigator} {...this.props}/>
	  </View>
    );
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
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
