import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableNativeFeedback,
  TouchableHighlight,
	Text,
	DatePickerAndroid,
	TimePickerAndroid,
	ScrollView,
	ToastAndroid,
	InteractionManager,
	TextInput,
	ActivityIndicator,
	BackAndroid,
	Dimensions,
	Alert,
	Image,
	Animated,
} from 'react-native';
import Calendar from './Calendar';
import Kaoqin from './Kaoqin';
import Netinfo from './Netinfo';
import Webviews from './Webviews';
import MoreApp from './MoreApp';
import scanner from './scanner';
import Mattendance from './Mattendance';
import Gonggao from './Gonggao';
import Sales from './Sales/Sales';
import pan from './pan';
import cameraCard from './cameraCard';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Application extends Component {
	constructor(props) {
        super(props);

        this.state = {
          domain:'',
		  cid:'',
		  token:'',
		  uid:'',
		  status:false,
		  datas:[],
		  loaded: false,
		  key:'',
		  statua:false,
		  fadeAnims: new Animated.Value(0),
		};
    }

	componentDidMount() {

	  this.setState({
		  domain:data.data.domain,
		  cid:data.data.cid,
		  token:data.data.token,
		  uid:data.data.uid,
		})
	  this._addsapp();
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

	_all(obj) {
        var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: obj,
                component: obj,
            })
			})
        }
    }


	_AddApp(){
		let _this = this;
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'MoreApp',
                component: MoreApp,
				params: {
                    getUser: function(user) {
                        _this.setState({
                            user: user
                        })
						if(user == true){
							_this.timer = setTimeout(
			                  () => {_this._addsapp();},800);

						}

                    }
                }

            })
			})
        }
	}

	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
	}



	_Webview(urls){

		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'Webviews',
                component: Webviews,
                params: {
					url: urls,

				}
            })
			})
        }
	}



	_addsapp(){
		var that=this;
	    this.setState({
			loaded: false,
		})
		fetch('' + data.data.domain + '/index.php?app=Home&m=MobileUserApps&a=lists&access_token=' + data.data.token + '', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'cid':data.data.cid,
					'uid':data.data.uid,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					  console.log(result)
					   that.setState({
						 datas:result.data,
						 loaded: true,
					   })
					   console.log(result)

				})
				.catch((error) => {
					that.setState({
						   loaded: true,
						   statua:true,
					   })
					Animated.timing(
						this.state.fadeAnims,
						{
						  toValue: 1,
						  duration: 1000,
						},

					 ).start();

				  });
	}
    _long(data){
    	Alert.alert(
            '操作',
            '你确定要移除？',
            [
              {text: '取消', onPress:this._cancer.bind(this)},
              {text: '确定', onPress:this._yes.bind(this)},
            ]
          )
		this.setState({
			status:true,
			key:data.key
		})
	}

	_cancer(){
		this.setState({
			status:false,
		})
	}

	_yes(){
		var that=this;
		that.setState({
		    status:false,
            loaded:false,
	    })
		fetch('' + data.data.domain + '/index.php?app=Home&m=MobileUserApps&a=del&access_token=' + data.data.token + '', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'cid': data.data.cid,
					'uid':data.data.uid,
                    'appkey':that.state.key,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					  console.log(result)
					   that.setState({
						 loaded:true,
					   })
                       that._addsapp();

				})
				.catch((error) => {
					that.setState({
						   loaded: true,
					   })

				  });
	}

	_shuax(){
		this._addsapp();
        this.setState({
		   loaded: false,
           statua:false,
	    })
	}




	render() {
      return (
	    <View style={{flex:1,flexDirection:'column',height:Dimensions.get('window').height}}>
	     <View style={styles.card}>

				  <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
							<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
										<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>我的应用</Text>
							</View>
				  </View>

				</View>
				<Netinfo  {...this.props}/>
		 <ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',}} automaticallyAdjustContentInsets={false}>

			    <View style={{borderBottomWidth:1,borderColor:'#eee',backgroundColor:'#fff'}}>
					<Text style={{fontSize:14,paddingTop:10,paddingBottom:10,paddingLeft:10,}}allowFontScaling={false}>
					   常用应用
					</Text>
			    </View>

				<View style={{flexDirection:'row',flexWrap:'wrap',backgroundColor:'#fff'}}>
				    <TouchableHighlight activeOpacity = {0.8} underlayColor="#eee"  onPress={this._all.bind(this,Gonggao)} style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,}}>
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#eee',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#4385f4',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/xiaox.png')} style={{width: 20, height: 20,}} />
					   </View>
					   <Text style={{marginTop:8,fontSize:12,}}allowFontScaling={false}>
					      通知公告
					   </Text>
					  </View>
					</TouchableHighlight>
					<TouchableHighlight  activeOpacity = {0.8} underlayColor="rgba(153, 153, 159, 0.29)" onPress={this._all.bind(this,Kaoqin)} style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,}}>
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#eee',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#F4BF43',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/dk.png')} style={{width: 22, height: 22,}} />
					   </View>
					   <Text style={{marginTop:8,fontSize:12}}allowFontScaling={false}>
					      考勤打卡
					   </Text>
					  </View>
					</TouchableHighlight>
					<TouchableHighlight  activeOpacity = {0.8} underlayColor="rgba(153, 153, 159, 0.29)" onPress={this._all.bind(this,Calendar)} style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,}}>
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#eee',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#3BAFDA',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/rc.png')} style={{width: 24, height: 24,}} />
					   </View>
					   <Text style={{marginTop:8,fontSize:12}}allowFontScaling={false}>
					      日程
					   </Text>
					  </View>
					</TouchableHighlight>

					<TouchableHighlight  activeOpacity = {0.8} underlayColor="rgba(153, 153, 159, 0.29)" onPress={this._all.bind(this,Mattendance)}  style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,}}>
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#eee',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#35DCEF',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/kq.png')} style={{width: 26, height: 26,}} />
					   </View>
					   <Text style={{marginTop:8,fontSize:12}}allowFontScaling={false}>
					      外勤签到
					   </Text>
					  </View>
					</TouchableHighlight>
					<TouchableHighlight  activeOpacity = {0.8} underlayColor="rgba(153, 153, 159, 0.29)" onPress={this._all.bind(this,pan)} style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,}}>
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#eee',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#3ed4ab',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/yun.png')} style={{width: 24, height: 24,}} />
					   </View>
					   <Text style={{marginTop:8,fontSize:12}}allowFontScaling={false}>
					      网盘
					   </Text>
					  </View>
					</TouchableHighlight>
					<TouchableHighlight  activeOpacity = {0.8} underlayColor="rgba(153, 153, 159, 0.29)" onPress={this._all.bind(this,scanner)}  style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,}}>
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#eee',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#7595ca',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/scanner.png')} style={{width: 26, height: 26,}} />
					   </View>
					   <Text style={{marginTop:8,fontSize:12}}allowFontScaling={false}>
					      扫一扫
					   </Text>
					  </View>
					</TouchableHighlight>
          <TouchableHighlight  activeOpacity = {0.8} underlayColor="rgba(153, 153, 159, 0.29)" onPress={this._all.bind(this,cameraCard)}  style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,}}>
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#eee',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#6b9f3d',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/scannerCard.png')} style={{width: 26, height: 26,}} />
					   </View>
					   <Text style={{marginTop:8,fontSize:12}}allowFontScaling={false}>
					      扫名片
					   </Text>
					  </View>
					</TouchableHighlight>
          <TouchableHighlight  activeOpacity = {0.8} underlayColor="rgba(153, 153, 159, 0.29)" onPress={this._all.bind(this,Sales)}  style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,}}>
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#eee',}}>
					   <View style={{width: 35, height: 35,borderRadius:5,backgroundColor:'#d76116',alignItems:'center', justifyContent:'center'}}>
					      <Image source={require('./imgs/sales.png')} style={{width: 26, height: 26,}} />
					   </View>
					   <Text style={{marginTop:8,fontSize:12}}allowFontScaling={false}>
					      销售管理
					   </Text>
					  </View>
					</TouchableHighlight>
				</View>



			 <View style={{backgroundColor:'#fff',marginTop:15,overflow:'hidden',}}>
			    <View style={{borderBottomWidth:1,borderColor:'#eee'}}>
					<Text style={{fontSize:14,paddingTop:10,paddingBottom:10,paddingLeft:10,}}allowFontScaling={false}>
					   其他应用
					</Text>
			    </View>

				<View style={{flexDirection:'row',flex:1,flexWrap:'wrap',}}>

					{this.state.datas.length>0 ? this.state.datas.map((data, i) => {
						return <TouchableHighlight key={i}
						style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,}}
						onLongPress={this._long.bind(this,data)}
             activeOpacity = {0.8} underlayColor="rgba(153, 153, 159, 0.29)"
						onPress={this._Webview.bind(this,data.iosurl)}>
					  <View style={{alignItems:'center', justifyContent:'center',width:Dimensions.get('window').width/4,height:Dimensions.get('window').width/4,borderRightWidth:1,borderBottomWidth:1,borderColor:'#eee',}}>
					   <View style={{width: 35, height: 35,borderRadius:7,overflow:'hidden',backgroundColor:'#4385f4',alignItems:'center', justifyContent:'center'}}>
					      <Image source={{uri:data.appicon}} style={{width: 35, height: 35,borderRadius:7,}} />
					   </View>
					   <Text style={{marginTop:8,fontSize:12}}allowFontScaling={false}>
						   {data.appname}
					   </Text>
					  </View>
					</TouchableHighlight>
					}) : <View style={{flexDirection:'row',flex:1,height:150,alignItems:'center',justifyContent:'center',}}>

								 <Text style={{fontSize:20,color:'#ccc',}}allowFontScaling={false}>暂无应用</Text>

						</View>}

				</View>
			 </View>
			 <TouchableOpacity  onPress={this._AddApp.bind(this)} >
				 <View style={{flexDirection:'row',height:50,justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',marginTop:15,}}>
					<View style={{flexDirection:'row',alignItems:'center',}}>
					  <Icon name="ios-add-outline" color="#707070"size={28} style={{marginTop:3}} />
					  <Text style={{marginLeft:10,fontSize:16,}}allowFontScaling={false}>添加应用</Text>
					</View>
					<View style={{alignItems:'center', justifyContent:'center'}}>
                       <Image source={require('./imgs/right.png')}  style={{width:30,height:15,}}/>
                    </View>
				 </View>
			 </TouchableOpacity>



		 </ScrollView>
		  <View style={{height:50,}}></View>
			 {!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-40,width:Dimensions.get('window').width,position:'absolute',top:0,left:0,}}>
						<View style={styles.loading}>
							<ActivityIndicator color="white"/>
							<Text style={styles.loadingTitle}allowFontScaling={false}>加载中……</Text>
						</View>
					  </View> : null}
			 {this.state.statua ? <Animated.View style={{opacity: this.state.fadeAnims,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-175)/2,left:(Dimensions.get('window').width-200)/2,}}>
				 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)} >
				  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
				  <Text style={{fontSize:16,color:'#fff',marginTop:20,}}allowFontScaling={false}>加载失败，请点击重试。</Text>
                 </TouchableOpacity>
	           </Animated.View> : null}
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
    paddingTop:20,
    height:65,
	backgroundColor:'#4385f4',
	flexDirection:'row'
  },
  dateTitle: {
	backgroundColor:'#4385f4',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-around',
    height:40,
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
  dateTitleText: {
	  color:'#ccc',
	  fontSize:13,
  },
});
