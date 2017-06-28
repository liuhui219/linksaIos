import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableNativeFeedback,
	Text,
	DatePickerAndroid,
	TimePickerAndroid,
	ScrollView,
	ToastAndroid,
	TextInput,
	Animated,
	ActivityIndicator,
	WebView,
	Dimensions,
	Modal,
	InteractionManager,
	BackAndroid,
	Platform,
	Image
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import Toast from '@remobile/react-native-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import {
  MapView,
  MapTypes,
  Geolocation
} from 'react-native-baidu-map';
import ImagePicker from 'react-native-image-picker';
import YTj from './YTj';
import Scustomera from './Scustomera';
import Scustomerb from './Scustomerb';
import Scustomerc from './Scustomerc';
import Scustomerd from './Scustomerd';
export default class Mattendance extends Component {

	constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {map: '正在定位中...',
		             mapType: MapTypes.NORMAL,
					 fadeAnim: new Animated.Value(0),
					 fadeAnims: new Animated.Value(0),
					 isshows:true,
					 isfalses:false,
					 avatarSource:'',
					 imguri: '',
					 maps:false,
					 names:'',
					 type:'',
					 imagesshow:false,
					 name:'',
					 ida:'',
					 fileImg:'',
					 ids:'',
					 times:'',
					 textaera:'',
					 isshowas:true,
					 modalVisible: false,
					 modalshow:false,
                     qiandao:false,
		             isfalse:false,
					 longitude:'',
					 latitude:'',
					 statua:false,
					 statu:false,
					 loaded: false,
					 zoom: 15,
					 infos:'',
				     center: {
						longitude: 0,
						latitude: 0
					  },
					 marker: {
						latitude: 0,
						longitude: 0,
						title: 'Your location'
					  },
					  trafficEnabled: false,
                      baiduHeatMapEnabled: false,
					  markers: [{
						longitude: 0,
						latitude: 0,
						title: ""
					  }]
					  };
    }
	componentDidFocus(){

	}

	componentDidMount() {
          this.timer = setTimeout(
		  () => {
		  this.setState({maps:true,})
		  this.fetchData('' + data.data.domain + '/index.php?app=Legwork&m=MLegwork&a=isopen&access_token=' + data.data.token + '');
          this.fetchDatatime('' + data.data.domain + '/index.php?app=Car&m=IndexMobile&a=date&access_token=' + data.data.token + '');
		  Geolocation.getCurrentPosition()
				  .then(data => {
					  console.log(data.address)
					  var _data=data;
					  Geolocation.reverseGeoCode(data.latitude, data.longitude)
				          .then(data => {
				          	   if(data.address == undefined){
								  this.setState({
									  map:'定位失败，请检查网络',
									  statua: true,
									  loaded: true,
								  })
							  }else{
								 this.setState({
								      zoom: 15,
									  map:data.address,
									  longitude:_data.longitude,
									  latitude:_data.latitude,
									  isfalse:true,
									   marker: {
										latitude: _data.latitude,
										longitude: _data.longitude,
										title: '你的位置'
									  },
									  center: {
										latitude: _data.latitude,
										longitude: _data.longitude
									  },
									  markers: [{
										latitude: _data.latitude,
										longitude: _data.longitude,
										title: "你的位置"
									  }]
								  })
							  }
				          })
				          .catch(e =>{
			                console.warn(e, 'error');
			              })

				  })
				  .catch(e =>{
					this.setState({
							statua: true,
							loaded: true,
						});
					Animated.timing(
						this.state.fadeAnim,
						{
						  toValue: 1,
						  duration: 1000,
						},

					  ).start();
				  })

			},
			  800
			);
	}
	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
	}
	 fetchData(url) {
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData) => {
				this.setState({
                    loaded: true,
				});
                if(responseData.Customer==1){
					this.setState({
						isshows: true,
					});
				}else{
					this.setState({
						isshows: false,
					});
				}
                if(responseData.Car==1){
					this.setState({
						isshowas: true,
					});
				}else{
					this.setState({
						isshowas: false,
					});
				}

		  })
		  .catch((error) => {
			this.setState({
			        statua: true,
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


    fetchDatatime(url) {
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData) => {

               this.setState({
                   loaded: true,
			       times:new Date(responseData).getFullYear()+'年'+(new Date(responseData).getMonth()+1)+'月'+new Date(responseData).getDate()+'日',
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
	 _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
			return true;
        }
		return false;
    }


	_select(data){

		this.setState({
			names: data.custom_company,
			modalVisible: false,
			name:'',
			type:0,
			ida:data.id,
			isfalses:true,
			});

	}

	_selectc(data){

		this.setState({
			names: data.name,
			modalVisible: false,
			name:'',
			ida:data.id,
            type:2,
			isfalses:false,
			});

	}

    _selects(data){

		this.setState({
			names: data.cname,
			type:1,
			ida:data.id,
			modalVisible: false,
			isfalses:false,
			});

	}

	_selectl(data){

		this.setState({
			name: data.name,
			modalshow: false,
			ids: data.id,
			});

	}

	_xz(visible){
		 this.setState({modalVisible: visible});
	}
	_lxr(visible){
		 this.setState({modalshow: visible});
	}
	_qiandao(visible){
         if(this.state.map == '正在定位中...'){
			 Toast.showShortBottom("定位信息不能为空！！！")
			 return false;
		 }else if(this.state.names == ''){
			 Toast.showShortBottom("客户名称不能为空！！！")
			 return false;
		 }else{
			 this.setState({qiandao: visible});
		 }
	}

	selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;

        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }
        console.log(response)
        this.setState({
          imguri:response.uri,
          avatarSource: source,
		  fileImg:response,
		  imagesshow:true,
        });
      }
    });
  }

	_delete(){
		this.setState({
          avatarSource: '',
          imguri:'',
          imagesshow:false,
        });
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


    _Tij(){
		var that=this;
		let formData = new FormData();
		if(this.state.imguri == ''){
			file = '';
		}else{
			file = {uri: this.state.imguri, type: 'multipart/form-data', name: 'a.jpg'};
		}
	    formData.append("img",file);
        formData.append("gsy_id",this.state.ida);
		formData.append("contacts_id",this.state.ids);
		formData.append("address",this.state.map);
		formData.append("lng",this.state.longitude);
		formData.append("lat",this.state.latitude);
		formData.append("mark",this.state.textaera);
		formData.append("type",this.state.type);

        if(file == ''){
            Toast.showShortBottom("请上传图片附件")
        	return false;
        }else{
		fetch('' + data.data.domain + '/index.php?app=Legwork&m=MLegwork&a=add_legwork&access_token=' + data.data.token + '', {
			  method: 'POST',
			  headers: {
				'Content-Type':'multipart/form-data',
			  },
			  body:formData,
			})
			.then(function (response) {
				return response.json();
			})
			.then(function (result) {
				console.log(result);
				that.setState({
					qiandao:false,
					avatarSource:'',
					textaera:'',
					infos:'提交成功',
					statu:true,
					imguri:'',
					});
				that.timerx = setTimeout(() => {
					  that.setState({
						 statu:false,
					})
				  },1000)
			})
			.catch((error) => {
				that.setState({
					qiandao:true,
					infos:'提交失败',
					statu:true,
					});
				that.timerx = setTimeout(() => {
					  that.setState({
						 statu:false,
					})
				  },1000)
			});
		}
	}
    componentWillUnmount() {
	  this.timerx && clearTimeout(this.timerx);
	}
	_shuax(){
		this.setState({
			loaded: false,
            statua: false,
            map: '正在定位中...',
		});
		this.fetchData('' + data.data.domain + '/index.php?app=Legwork&m=MLegwork&a=isopen&access_token=' + data.data.token + '');
        this.fetchDatatime('' + data.data.domain + '/index.php?app=Car&m=IndexMobile&a=date&access_token=' + data.data.token + '');
		Geolocation.getCurrentPosition()
				  .then(data => {
					  console.log(data.address)
					  var _data=data;
					  Geolocation.reverseGeoCode(data.latitude, data.longitude)
				          .then(data => {
				          	   if(data.address == undefined){
								  this.setState({
									  map:'定位失败，请检查网络',
									  statua: true,
									  loaded: true,
								  })
							  }else{
								 this.setState({
								      zoom: 15,
									  map:data.address,
									  longitude:_data.longitude,
									  latitude:_data.latitude,
									  isfalse:true,
									   marker: {
										latitude: _data.latitude,
										longitude: _data.longitude,
										title: '你的位置'
									  },
									  center: {
										latitude: _data.latitude,
										longitude: _data.longitude
									  },
									  markers: [{
										latitude: _data.latitude,
										longitude: _data.longitude,
										title: "你的位置"
									  }]
								  })
							  }
				          })
				          .catch(e =>{
			                console.warn(e, 'error');
			              })

				  })
				  .catch(e =>{
					this.setState({
							statua: true,
							loaded: true,
						});
					Animated.timing(
						this.state.fadeAnim,
						{
						  toValue: 1,
						  duration: 1000,
						},

					  ).start();
				  })

	}

	_TJ(){
		const { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'YTj',
                component: YTj,
            })
			})
        }
	}


render() {
    return (
	    <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',overflow:'hidden'}}>

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

										<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>外勤签到</Text>

				  </View>
				  <TouchableOpacity onPress={this._TJ.bind(this)} style={{flex:1,}}>
					  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

					           <Text style={{color:'#fff',fontSize:16,marginRight:5,}} allowFontScaling={false}>统计</Text>

					  </View>
				  </TouchableOpacity>
				</View>
				<ScrollView style={{flex:1,backgroundColor:'#fff'}}  alwaysBounceVertical={false}>
				    <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
					    <Icon name="ios-time-outline" color="#ccc"size={20}  />
					    <Text style={{paddingLeft:10,color:'#aaa',fontSize:14,}} allowFontScaling={false}>{this.state.times}</Text>
					</View>
                    <View style={{flexDirection:'row',height:50,alignItems:'center',paddingLeft:10,}}>
					    <Icon name="ios-locate-outline" color="#aaa"size={20}  />
					    <Text style={{fontSize:15,paddingLeft:8,fontSize:14,}} allowFontScaling={false}>{this.state.map}</Text>
					</View>
                    <View style={{height:170,paddingBottom:20,width: Dimensions.get('window').width,justifyContent: 'center',alignItems: 'center',backgroundColor:'#fff',borderBottomWidth:1,borderColor:'#ececec',}}>
					    {this.state.maps ? <MapView
						  trafficEnabled={this.state.trafficEnabled}
						  baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
						  zoom={this.state.zoom}
						  zoomControlsVisible={false}
						  mapType={this.state.mapType}
						  center={this.state.center}
						  style={styles.map}
						  marker={this.state.marker}
						  markers={this.state.markers}
						  onMapClick={(e) => {

						  }}
						>
						</MapView> : null}
					</View>
                    <View style={{flexDirection:'row',justifyContent: 'space-between',height:60,alignItems:'center',paddingLeft:10,paddingRight:10,}}>
					    <Text style={{fontSize:14,width:70,}} allowFontScaling={false}>客户名称</Text>
						<Text style={{flex:1,paddingLeft:30,fontSize:13,}} allowFontScaling={false}>{this.state.names}</Text>
						<TouchableOpacity   activeOpacity={0.6} onPress={this._xz.bind(this,true)}>
							<View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',}}>
							   <Image source={require('./imgs/xz.png')} style={{width: 26, height: 26}} />
							   <Text style={{color:'#4385f4',fontSize:13,}} allowFontScaling={false}>选择</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={{height:5,backgroundColor:'#ececec'}}></View>
					{this.state.isfalses ? <View style={{flexDirection:'row',justifyContent: 'space-between',height:60,alignItems:'center',paddingLeft:10,paddingRight:10,borderTopWidth:1,borderColor:'#ececec'}}>
					    <Text style={{fontSize:14,width:70,}} allowFontScaling={false}>联系人</Text>
						<Text style={{flex:1,paddingLeft:30,fontSize:13,}} allowFontScaling={false}>{this.state.name}</Text>
						<TouchableOpacity   activeOpacity={0.6} onPress={this._lxr.bind(this,true)}>
							<View style={{flexDirection:'column',alignItems:'center',justifyContent:'center',}}>
							   <Image source={require('./imgs/xz.png')} style={{width: 26, height: 26}} />
							   <Text style={{color:'#4385f4',fontSize:13,}} allowFontScaling={false}>选择</Text>
							</View>
						</TouchableOpacity>
					</View> : <View></View>}
					<View style={{height:5,backgroundColor:'#ececec'}}></View>
                    <View style={{marginTop:30,flexDirection:'column', backgroundColor:'#fff',alignItems:'center',justifyContent:'center',}}>
					    <View style={{alignItems:'center',justifyContent:'center',marginBottom:10, marginTop:10,}}>
						  <TouchableOpacity   activeOpacity={0.6} onPress={this._qiandao.bind(this,true)}>
							<View style={{width:120,height:120,borderRadius:60,backgroundColor:'#cdcdcd',alignItems:'center',justifyContent:'center',}}>
							  <View style={{width:110,height:110,borderRadius:55,backgroundColor:'#4385f4',alignItems:'center',justifyContent:'center',}}>
								  <Text style={{color:'#fff',fontSize:20,}} allowFontScaling={false}>签到</Text>
							  </View>
						   </View>
						  </TouchableOpacity>
				        </View>
					</View>
                    <View>
					   <Modal
						  animationType={"slide"}
						  transparent={false}
						  visible={this.state.modalVisible}
						  onRequestClose={() => {console.log("Modal has been closed.")}}
						  >
						  <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
						     <View style={styles.card}>
								  <View style={{flex:1,justifyContent:'center'}}>
										<TouchableOpacity onPress={this._xz.bind(this,false)}>
											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
											  </View>
										</TouchableOpacity>
								  </View>
								  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

											  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>选择客户</Text>

								  </View>
								  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

								  </View>
								</View>
								<ScrollableTabView
								  style={{flex:1,flexDirection:'column',backgroundColor:'#ededed',}}
								  renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
								  tabBarPosition='overlayTop'
								  tabBarInactiveTextColor ='#333'
								  tabBarActiveTextColor ='#4385f4'
								  tabBarUnderlineStyle={{backgroundColor: '#4385f4'}}
								  tabBarTextStyle={{fontSize: 16}}
								>
									{this.state.isshows ? <View  style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='客户'>
										 <Scustomera  _select={this._select.bind(this)}/>
									</View> : null}
									{this.state.isshows ? <View style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='线索客户'>
										 <Scustomerb  _selects={this._selects.bind(this)}/>
									  </View> : null}
								    {this.state.isshowas ? <View style={{marginTop:50,flex:1,backgroundColor:'#fff'}} tabLabel='汽车客户'>
									     <Scustomerc _selectc={this._selectc.bind(this)}/>
								      </View> : null}
								</ScrollableTabView>
						  </View>
              <PassState navigator = {this.props.navigator} {...this.props}/>
              
					   </Modal>
					</View>
                    <View>
					   <Modal
					      animationType={"slide"}
						  transparent={false}
						  visible={this.state.modalshow}
						  onRequestClose={() => {console.log("Modal has been closed.")}}
					   >
					      <View style={styles.card}>
					          <TouchableOpacity onPress={this._lxr.bind(this,false)} style={{flex:1}}>
								  <View style={{flex:1,justifyContent:'center'}}>

											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
											  </View>

								  </View>
							  </TouchableOpacity>
							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>联系人</Text>

							  </View>
							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

							  </View>
							</View>
							<View style={{flex:1,}}>
							     <Scustomerd id={this.state.ida} _selectl={this._selectl.bind(this)} />
							</View>
              <PassState navigator = {this.props.navigator} {...this.props}/>
					   </Modal>
					</View>
                    <View>
					   <Modal
					      animationType={"slide"}
						  transparent={false}
						  visible={this.state.qiandao}
						  onRequestClose={() => {console.log("Modal has been closed.")}}
					   >
					      <View style={styles.card}>
					          <TouchableOpacity onPress={this._qiandao.bind(this,false)} style={{flex:1}}>
								  <View style={{flex:1,justifyContent:'center'}}>

											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
											  </View>

								  </View>
							  </TouchableOpacity>
							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>签到</Text>

							  </View>
							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

							  </View>
						  </View>
						  <View  style={{flex:1,}}>
						      <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
									<Icon name="ios-time-outline" color="#999"size={20}  />
									<Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>签到时间:</Text>
									<Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>{this.state.times}</Text>
							  </View>
							  <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'flex-start',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
									<Icon name="ios-locate-outline" color="#aaa"size={20}  />
									<Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>签到地点:</Text>
									<Text style={{paddingLeft:10,flex:1,paddingRight:5,fontSize:14,}} allowFontScaling={false}>{this.state.map}</Text>
							  </View>
                              <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
									<Icon name="ios-contact-outline" color="#999"size={20}  />
									<Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>客户名称:</Text>
									<Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>{this.state.names}</Text>
							  </View>
                              {this.state.isfalses ? <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
									<Icon name="ios-contact" color="#999"size={20}  />
									<Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>联系人:</Text>
									<Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>{this.state.name}</Text>
							  </View> : <View></View>}
							  <View style={{height:15,backgroundColor:'#ececec'}}></View>
							  <View style={{padding:10,}}>
							        <TextInput
									  onChangeText={(textaera) => this.setState({textaera})}
									  multiline={true}
									  numberOfLines={5}
									  placeholderTextColor={'#ccc'}
									  style={{ color:'#666',fontSize:14,textAlignVertical:'top',height:100,}}
									  placeholder='请填写备注'
									  underlineColorAndroid={'transparent'}
									/>
							  </View>
							  <View style={{padding:10,flexDirection:'row',alignItems:'center',}}>
							      {this.state.imagesshow ? <View style={{height:85,alignItems:'center',justifyContent:'center',}}>
								     <Image source={this.state.avatarSource} style={{width: 70, height: 70,marginRight:15,}} />
									 <TouchableOpacity onPress={this._delete.bind(this)} style={{position:'absolute',right:8,top:0,}}>
										 <View style={{width:18,height:18,borderRadius:9,backgroundColor:'red',justifyContent:'center',alignItems:'center',overflow:'hidden'}}>
											<Icon name="ios-close-outline" color="#fff"size={20}  />
										 </View>
									 </TouchableOpacity>
								  </View> : null}
							      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
							        <Image source={require('./imgs/photo.png')} style={{width: 70, height: 70,}} />
								  </TouchableOpacity>
							  </View>
							  <View style={{flex:1,backgroundColor:'#ececec'}}></View>
							  <TouchableOpacity onPress={this._Tij.bind(this)}   >
								<View style={{height:55,backgroundColor:'#fff',width:Dimensions.get('window').width,alignItems:'center',justifyContent:'center'}}>
									 <View>
										 <Text style={{fontSize:18,color:'#4385f4'}} allowFontScaling={false}>
											 提交
										 </Text>
									 </View>
								</View>
							   </TouchableOpacity>
						  </View>
              <PassState navigator = {this.props.navigator} {...this.props}/>
					   </Modal>
                    </View>

				</ScrollView>
				{this.state.statu ? <Animated.View style={{ padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				  <Icon name="ios-close-outline" color="#fff"size={36}  />
				  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false}>{this.state.infos}</Text>
	            </Animated.View> : null}
				{!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',height:80,position:'absolute',top:(Dimensions.get('window').height-80)/2,left:(Dimensions.get('window').width-100)/2,}}>
						<View style={styles.loading}>
							<ActivityIndicator color="white"/>
							<Text style={styles.loadingTitle} allowFontScaling={false}>加载中……</Text>
						</View>
				  </View> : <View></View>}
				{this.state.statua ? <Animated.View style={{opacity: this.state.fadeAnim,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				 <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)} >
				  <Icon name="ios-refresh-outline" color="#fff"size={36}  />
				  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false}>加载失败，请点击重试。</Text>
                 </TouchableOpacity>
	           </Animated.View> : <View></View>}
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
	flexDirection:'row',

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
  map: {
	paddingLeft:10,
	paddingRight:10,
    width: Dimensions.get('window').width-20,
    height: 150,
  }
});
