import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	StatusBar,
	ScrollView,
	BackAndroid,
	Image
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import Gonggaoa from './Gonggaoa';
import Token from './Token';
import HTMLView from 'react-native-htmlview';
export default class Gonggaob extends React.Component {
	constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {data:{},};
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

	       this.fetchData('' + data.data.domain + '/index.php?app=Notice&m=NoticeApi&a=detailed_notice&access_token=' + data.data.token + '');

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
	fetchData(url) {
		var that=this;
		fetch(url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'id': this.props.id,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {

					  that.setState({
						   data:result.data,
					  })



				})


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
										<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>公告信息</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
				</View>

				<View style={{flex:1,backgroundColor:'#fff',}}>
				     <View style={{flexDirection:'column',flex:1, }}>
					    <View style={{justifyContent:'center',alignItems:'center',height:40,}}>
					     <Text style={{fontSize:16}} allowFontScaling={false}>{this.state.data.title}</Text>
						</View>
						<View style={{flexDirection:'row',paddingLeft:10,paddingRight:10,height:30,borderBottomWidth:0.6,borderColor:'#bbb',alignItems:'center',}}>
						   <Text style={{fontSize:13,}} allowFontScaling={false}>
						      发布人：{this.state.data.name}
						   </Text>
						   <Text style={{marginLeft:15,fontSize:15,fontSize:13}} allowFontScaling={false}>
						      发布时间：{this.state.data.worktime}
						   </Text>
						</View>
						<ScrollView style={{flex:1,}}>

						    <Text style={{marginTop:5,flexWrap:'wrap',lineHeight:20,paddingLeft:5,paddingRight:5,color:'#333',fontSize:16,}} allowFontScaling={false}> <HTMLView value={this.state.data.content} /></Text>
						</ScrollView>
					 </View>
				</View>
        <Push navigator = {this.props.navigator} {...this.props}/>
        <PassState navigator = {this.props.navigator} {...this.props}/>
		   </View>
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
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
