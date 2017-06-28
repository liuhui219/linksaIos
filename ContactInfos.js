import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	ScrollView,
	Linking,
	BackAndroid,
	ActivityIndicator,
	Animated,
	Dimensions,
	Image,
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/Ionicons';
import Token from './Token';
export default class ContactInfos extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {id: '',uid:'',datas:{},img:'',statu:false,fadeAnim: new Animated.Value(0),loaded: false,};
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
        //这里获取传递过来的参数: name



		this.fetchData('' + data.data.domain + '/index.php?app=Home&m=MobileApi&a=memberInfo&access_token=' + data.data.token+ '&memberId='+this.props.uid);
    }



	fetchData(url) {
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData) => {



			    this.setState({
					datas: responseData.data,
					loaded: true,
					img:{uri: data.data.domain.slice(0,-6)+responseData.data.photo.slice(1)},
				});
		  })
		  .catch((error) => {
			this.setState({
			        statu: true,
                    loaded: true,
				});
            Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

		  });
    }
	_shuax(){
		this.setState({
			statu: false,
			loaded: false,
		});
		this.fetchData('' + data.data.domain + '/index.php?app=Home&m=MobileApi&a=memberInfo&access_token=' + data.data.token + '&memberId='+this.props.uid);
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
										<Text style={{color:'white',fontSize:16}} allowFontScaling={false}></Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
				</View>

				<View style={{flex:1,flexDirection:'column',backgroundColor:'#ececec'}}>
				    <View style={{height:150,flexDirection:'column',backgroundColor:'#4385f4',alignItems:'center',paddingBottom:40, }}>
					   <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:80,width:80,borderRadius:40, backgroundColor:'#659BF5' }}>
					     <Image source={this.state.img} style={{width: 80,height:80,borderRadius:40,}} />
					   </View>
					   <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:10,}}>
					      <Text style={{color:'#fff',fontSize:16,}} allowFontScaling={false}>{ this.props.id }</Text>
					   </View>
					</View>
					 <ScrollView>
					<View style={{backgroundColor:'#fff',marginTop:10,paddingLeft:20,flexDirection:'column',}}>
					   <Text style={{paddingTop:15,paddingBottom:15, color:'#4385f4',}} allowFontScaling={false}>联系方式</Text>
					   <View style={{flexDirection:'row', borderBottomWidth:0.5, borderColor:'#dadada',height:50,alignItems:'center',}}>
						   <View>
							  <Text style={{ color:'#999',fontSize:14,}} allowFontScaling={false}>电子邮件：</Text>
						   </View>

						   <View style={{flex:1,marginLeft:20,flexDirection:'row',justifyContent:'center',alignItems:'center',}} >

							  <Text style={{fontSize:14,flex:1,}} allowFontScaling={false}>{this.state.datas.email}</Text>
							  <TouchableOpacity
							      activeOpacity={0.5}
                                  onPress={()=>Linking.canOpenURL('mailto:'+this.state.datas.email).then(supported => {
							           if (supported) {
							               Linking.openURL('mailto:'+this.state.datas.email);
							           } else {
							              console.log('无法打开该URI: ');
							           }
							        })}
                                  underlayColor={'#dedede'}
								  style={{width:50,height:50,justifyContent:'center',alignItems:'center', }}
							  >
							      <Image source={require('./imgs/email.png')} style={{height:30,width:30,}} />
							  </TouchableOpacity>

						   </View>

					   </View>
					   <View style={{flexDirection:'row', borderBottomWidth:0.5, borderColor:'#dadada',height:50,alignItems:'center',}}>
						   <View>
							  <Text  style={{ color:'#999',fontSize:14,}} allowFontScaling={false}>移动电话：</Text>
						   </View>
						   {this.state.datas.phone ? <View style={{flex:1,marginLeft:20, flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
							  <Text style={{flex:1,fontSize:14,}} allowFontScaling={false}>{this.state.datas.phone}</Text>
							  <TouchableOpacity
							      activeOpacity={0.5}
                                  onPress={() => Communications.phonecall(this.state.datas.phone, false)}
                                  underlayColor={'#dedede'}
								  style={{width:50,height:50,justifyContent:'center',alignItems:'center', }}
							  >
							      <Image source={require('./imgs/iphone.png')} style={{height:30,width:30,}} />
							  </TouchableOpacity>
						   </View> : <View style={{flex:1,marginLeft:20, }}>
							  <Text style={{fontSize:14,}} allowFontScaling={false}>暂无</Text>
						   </View> }
					   </View>
					    <View style={{flexDirection:'row', height:50,alignItems:'center',}}>
						   <View>
							  <Text style={{color:'#999',fontSize:14,}} allowFontScaling={false}>固定电话：</Text>
						   </View>
                           {this.state.datas.mobile ? <View style={{flex:1,marginLeft:20, flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
							  <Text style={{flex:1,fontSize:14,}} allowFontScaling={false}>{this.state.datas.mobile}</Text>
							  <TouchableOpacity
							      activeOpacity={0.5}
                                  onPress={() => Communications.phonecall(this.state.datas.mobile, false)}
                                  underlayColor={'#dedede'}
								  style={{width:50,height:50,justifyContent:'center',alignItems:'center', }}
							  >
							      <Image source={require('./imgs/mobile.png')} style={{height:30,width:30,}} />
							  </TouchableOpacity>
						   </View> : <View style={{flex:1,marginLeft:20, }}>
							  <Text style={{fontSize:14,}} allowFontScaling={false}>暂无</Text>
						   </View> }
					   </View>
					</View>

					<View style={{backgroundColor:'#fff',marginTop:10,paddingLeft:20,flexDirection:'column',}}>
					   <Text style={{paddingTop:15,paddingBottom:15, color:'#4385f4',}} allowFontScaling={false}>部门职位</Text>
					   <View style={{flexDirection:'row', borderBottomWidth:0.5, borderColor:'#dadada',height:50,alignItems:'center',}}>
						   <View>
							  <Text style={{ color:'#999',fontSize:14,}} allowFontScaling={false}>所在部门：</Text>
						   </View>
						   <View style={{flex:1,marginLeft:20, }}>
							  <Text style={{fontSize:14,}} allowFontScaling={false}>{this.state.datas.deptName}</Text>
						   </View>
					   </View>
					   <View style={{flexDirection:'row', height:50,alignItems:'center',}}>
						   <View>
							  <Text style={{ color:'#999',fontSize:14,}} allowFontScaling={false}>职位名称：</Text>
						   </View>
						   <View style={{flex:1,marginLeft:20,}}>
							  <Text style={{fontSize:14,}} allowFontScaling={false}>{this.state.datas.postName}</Text>
						   </View>
					   </View>
					</View>

					</ScrollView>
				</View>

                  {!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',backgroundColor: '#F5FCFF',height:80,position:'absolute',top:(Dimensions.get('window').height-80)/2,left:(Dimensions.get('window').width-100)/2,}}>
						<View style={styles.loading}>
							<ActivityIndicator color="white"/>
							<Text style={styles.loadingTitle} allowFontScaling={false}>加载中……</Text>
						</View>
				  </View> : <View></View>}
				{this.state.statu ? <Animated.View style={{opacity: this.state.fadeAnim,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)}>
				  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
				  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false}>加载失败，请点击刷新。</Text>
                 </TouchableOpacity>
	           </Animated.View> : <View></View>}
             <Push navigator = {this.props.navigator} {...this.props}/>
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
