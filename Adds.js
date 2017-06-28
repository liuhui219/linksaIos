import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	Text,
	DatePickerIOS,
  KeyboardAvoidingView,
	ScrollView,
	TextInput,
	Animated,
	Dimensions,
	Image
} from 'react-native';
import Push from './Push';
import Toast from '@remobile/react-native-toast';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker'
import Token from './Token';
import Netinfo from './Netinfo';
import PassState from './PassState';
import DateTimePicker from 'react-native-datetime';
var dataImpor = [];

export default class Adds extends Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        this.state = {
			result: '请选择(必填)',
			results:'',
           	result1: '请选择(必填)',
			results1:'',
			language:'请选择(必填)',
			richeng:'请选择(必填)',
			youxian:'请选择(必填)',
			selectedValue:'',
			pickerData:['1'],
			text:'',
			textaera:'',
            datas:{},
            date:new Date(),
			yxid:0,
			rc:0,
			times:0,
            timeZoneOffsetInHours: null,
			statu:false,
			fadeAnim: new Animated.Value(0),
			bottom:new Animated.Value(-260),
			bottom1:new Animated.Value(-260),
			add:false,
			timesshow:false,
			timesshowa:false,
			domain:'',
		    cid:'',
		    token:'',
		    uid:'',
		};
    }


    _pressButton() {
		dataImpor = [];
        var { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();

        }

    }

    componentDidMount() {
    	this.setState({
		  domain:data.data.domain,
		  cid:data.data.cid,
		  token:data.data.token,
		  uid:data.data.uid,
		  timeZoneOffsetInHours:(-1) * (new Date()).getTimezoneOffset() / 60
		});
		this.timer = setTimeout(
		  () => {
		this.fetchData();
	  },1000);
    }

    componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
	}

	fetchData() {
		fetch('' + data.data.domain + '/index.php?app=Calendar2&m=CalendarApi&a=Calendar_category&access_token=' + data.data.token + '')
		  .then((response) => response.json())
		  .then((responseData) => {
		  	    console.log(responseData)
		  	    var array=[];
		  	    responseData.cate.forEach((v,i) => {
                    array.push(v.important);
                    this.setState({
						pickerData: array,
						selectedValue:responseData.cate[0].important,
					});
		  	    })
				this.setState({
					datas: responseData,
					loaded: true,
					statu:false,
				});

		  })
		  .catch((error) => {

			this.setState({
					loaded: true,
					statu:true,
				});
				Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

			  this.timerx = setTimeout(() => {
							  this.setState({
								 statu:false,
							})
						  },1500)
		  });
    }

    componentWillUnmount() {
	  this.timerx && clearTimeout(this.timerx);
	}

	Gdate(n){
		if(n<10){
			 return '0'+n;
		}
		 else{
		     return ''+n;
		}
	}

	_onPressHandle(){

		this.picker.toggle();
	}

	_onPressHandles(){

		this.pickers.toggle();
	}

	_onPressHandlea(){

		this.pickera.toggle();
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

	trim(str)
	   {
		 return str.replace(/(^\s*)|(\s*$)/g, ""); 		　　
	   }
    _tijiao(){

		var that = this
		if(this.trim(this.state.text) == ''){
			Toast.showShortBottom("日程名称不能为空！！！")
			return false;
		}else if(this.state.result == '请选择(必填)'){
			Toast.showShortBottom("开始时间未选！！！")
			return false;
		}else if(this.state.result1 == '请选择(必填)'){
			Toast.showShortBottom("结束时间未选！！！")
			return false;
		}else if(this.state.richeng == '请选择(必填)'){
			Toast.showShortBottom("日程类型未选！！！")
			return false;
		}else if(this.state.youxian == '请选择(必填)'){
			Toast.showShortBottom("优先等级未选！！！")
			return false;
		}else if(this.state.language == '请选择(必填)'){
			Toast.showShortBottom("提前通知未选！！！")
			return false;
		}else if(this.trim(this.state.textaera) == ''){
			Toast.showShortBottom("日程内容不能为空！！！")
			return false;
		}else if((new Date(this.state.result.replace(/-/g,"\/"))) >= (new Date(this.state.result1.replace(/-/g,"\/")))){
			Toast.showShortBottom("开始时间不能大于结束时间！！！")
			return false;
		}else{
			fetch('' + this.state.domain + '/index.php?app=Calendar2&m=CalendarApi&a=Calendar_add&access_token=' + this.state.token + '', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			  },
			  body: this.toQueryString({
				'title': this.state.text,
				'content': this.state.textaera,
                'type': this.state.rc,
                'important': this.state.yxid,
                'startime': this.state.result,
                'endtime': this.state.result1,
                'tixintime': this.state.times,
			  })
			})
			.then(function (response) {
				return response.json();
			})
			.then(function (result) {
				console.log(result);
				if(result.statu == 1){

					Toast.showShortBottom("提交成功")
					dataImpor = [];

			        that._pressButton();


				}
			})
			.catch((error) => {

			Toast.showShortBottom("提交失败")
		  });

		}

	}

onDateChange(date) {

    this.setState({date: date});
}

   _datetime(){

        Animated.timing(
				this.state.bottom,
				{
				  toValue: 0,
				  duration: 200,
				},

			  ).start();
        this.setState({
      	     add:!this.state.add,
      	     timesshow:true,
        });
   }

   _cancle(){

   	    Animated.timing(
				this.state.bottom,
				{
				  toValue: -260,
				  duration: 200,
				},

			  ).start();
   	    Animated.timing(
				this.state.bottom1,
				{
				  toValue: -260,
				  duration: 200,
				},

			  ).start();
   	    this.setState({
      	     add:!this.state.add,
        });
   }


   _finish(){

      this.setState({
      	 result: this.state.date.getFullYear()+'-'+this.Gdate((this.state.date.getMonth()+1))+'-'+this.Gdate(this.state.date.getDate())+' '+this.Gdate(this.state.date.getHours())+':'+this.Gdate(this.state.date.getMinutes()),
         date:new Date(),
         add:false,
        });
       Animated.timing(
				this.state.bottom,
				{
				  toValue: -260,
				  duration: 200,
				},

			  ).start();
   }

   _finish1(){

      this.setState({
      	 result1: this.state.date.getFullYear()+'-'+this.Gdate((this.state.date.getMonth()+1))+'-'+this.Gdate(this.state.date.getDate())+' '+this.Gdate(this.state.date.getHours())+':'+this.Gdate(this.state.date.getMinutes()),
         date:new Date(),
         add:false,
        });
       Animated.timing(
				this.state.bottom1,
				{
				  toValue: -260,
				  duration: 200,
				},

			  ).start();
   }

   _datetime1(){
        Animated.timing(
				this.state.bottom1,
				{
				  toValue: 0,
				  duration: 200,
				},

			  ).start();
        this.setState({
      	     add:!this.state.add,
      	     timesshowa:true,
        });
   }

   _adds(){
		this.setState({add:false,})
		 Animated.timing(
				this.state.bottom1,
				{
				  toValue: -260,
				  duration: 200,
				},

			  ).start();

		 Animated.timing(
				this.state.bottom,
				{
				  toValue: -260,
				  duration: 200,
				},

			  ).start();
	}

    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
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
										<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>新增日程</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
				</View>
				<Netinfo  {...this.props}/>
        <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
				<ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#ececec'}}>

				    <View style={{flexDirection:'row',height:45,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}}allowFontScaling={false}>日程名称</Text>
						<View style={{flex:1,marginLeft:15,justifyContent:'center',}}>
					    <TextInput
						  numberOfLines={1}
						  onChangeText={(text) => this.setState({text})}
						  placeholderTextColor={'#999'}
						  style={{ color:'#666',fontSize:14,height:30,}}
						  placeholder='日程名称(必填)'
						  underlineColorAndroid={'transparent'}
						/>
						</View>
					</View>

                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}}allowFontScaling={false}>开始时间</Text>
						<TouchableOpacity
						         activeOpacity={0.8}
						         onPress={this._datetime.bind(this)}
                                  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}allowFontScaling={false}>
									{this.state.result}
								</Text>

							</View>
						    <Icon name="ios-arrow-forward" color="#ccc"size={27}  />

						</TouchableOpacity  >
					</View>
                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}}allowFontScaling={false}>结束时间</Text>
						<TouchableOpacity
						         activeOpacity={0.8}
						         onPress={this._datetime1.bind(this)}
                                 style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}allowFontScaling={false}>
									{this.state.result1}
								</Text>

							</View>
						    <Icon name="ios-arrow-forward" color="#ccc"size={27}  />

						</TouchableOpacity  >
					</View>

					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}}allowFontScaling={false}>日程类型</Text>
						<TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._onPressHandles.bind(this)}
								 style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}allowFontScaling={false}>
									{this.state.richeng}
								</Text>

							</View>
						    <Icon name="ios-arrow-forward" color="#ccc"size={27}  />

						</TouchableOpacity  >
					</View>
                    <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}}allowFontScaling={false}>优先等级</Text>
						<TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._onPressHandlea.bind(this)}
								 style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}allowFontScaling={false}>
									{this.state.youxian}
								</Text>

							</View>
						    <Icon name="ios-arrow-forward" color="#ccc"size={27}  />

						</TouchableOpacity  >
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}}allowFontScaling={false}>提前通知</Text>
						<TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._onPressHandle.bind(this)}
								 style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}allowFontScaling={false}>
									{this.state.language}
								</Text>

							</View>
						    <Icon name="ios-arrow-forward" color="#ccc"size={27}  />

						</TouchableOpacity  >
					</View>

					 <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'flex-start',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666', paddingTop:5,}}allowFontScaling={false}>日程内容</Text>
						<View style={{flex:1,marginLeft:15,}}>
					    <TextInput
						  onChangeText={(textaera) => this.setState({textaera})}
						  multiline={true}
						  numberOfLines={5}
						  placeholderTextColor={'#999'}
            style={{ color:'#666',fontSize:14,textAlignVertical:'top',paddingTop:0,height:120,}}
						  placeholder='日程内容(必填)'
						  underlineColorAndroid={'transparent'}
						/>
						</View>
					</View>

					<TouchableOpacity activeOpacity={0.8} onPress={this._tijiao.bind(this)}   style={{marginTop:30,backgroundColor:'#4385f4',marginLeft:20,marginRight:20,height:50,alignItems:'center',justifyContent:'center',borderRadius:5,}}>
					     <Text style={{color:'#fff',fontSize:18,}}allowFontScaling={false}>提交</Text>
					</TouchableOpacity>
					</ScrollView>
          </KeyboardAvoidingView>
				    <Picker
						ref={picker => this.picker = picker}
						style={{height: 250,backgroundColor:'#fff',}}
						pickerToolBarStyle={{height:45,}}
						pickerBtnStyle ={{fontSize:16,color:'#000',}}
						showDuration={300}
						pickerBtnText='确定'
						pickerCancelBtnText='取消'
						selectedValue={'不提醒'}
						pickerData={['不提醒','10分钟','30分钟','一小时','六小时','一天']}
						onPickerDone={(pickedValue) => {
							this.setState({language:pickedValue})
							if(pickedValue == '不提醒'){
								this.setState({times:0})
							}else if(pickedValue == '10分钟'){
								this.setState({times:10})
							}else if(pickedValue == '30分钟'){
								this.setState({times:30})
							}else if(pickedValue == '一小时'){
								this.setState({times:60})
							}else if(pickedValue == '六小时'){
								this.setState({times:360})
							}else if(pickedValue == '一天'){
								this.setState({times:1440})
							}
						}}
				    />
					<Picker
						ref={picker => this.pickers = picker}
						style={{height: 250,backgroundColor:'#fff',}}
						pickerToolBarStyle={{height:45,}}
						pickerBtnStyle ={{fontSize:16,color:'#000',}}
						showDuration={300}
						pickerBtnText='确定'
						pickerCancelBtnText='取消'
						selectedValue={'个人日程'}
						pickerData={['个人日程','工作日程','工作计划']}
						onPickerDone={(pickedValue) => {
							this.setState({richeng:pickedValue})
							if(pickedValue == '个人日程'){
								this.setState({rc:0})
							}else if(pickedValue == '工作日程'){
								this.setState({rc:1})
							}else if(pickedValue == '工作计划'){
								this.setState({rc:2})
							}
						}}
				    />
					<Picker
						ref={picker => this.pickera = picker}
						style={{height: 250,backgroundColor:'#fff',}}
						pickerToolBarStyle={{height:45,}}
						pickerBtnStyle ={{fontSize:16,color:'#000',}}
						showDuration={300}
						pickerBtnText='确定'
						pickerCancelBtnText='取消'
						selectedValue={this.state.selectedValue}
						pickerData={this.state.pickerData}
						onPickerDone={(pickedValue) => {
							this.setState({youxian:pickedValue})
							this.state.datas.cate.forEach((m,i) => {
								if(m.important == pickedValue){
									this.setState({yxid:m.id})
								}
							})
						}}
				    />
                {this.state.add ? <TouchableOpacity onPress={this._adds.bind(this)}  style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-65,position:'absolute',top:65,left:0,backgroundColor:'rgba(130, 130, 130, 0.37)'}}>
                <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-65,backgroundColor:'rgba(61, 61, 62, 0)',position:'absolute',top:0,left:0,}}></View>
                </TouchableOpacity> : <View></View>}
                {this.state.timesshow ? <Animated.View style={{flexDirection:'column',height:260,position:'absolute',bottom:this.state.bottom,left:0,width:Dimensions.get('window').width,backgroundColor:'#eee'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:45,paddingRight:10,paddingLeft:10,backgroundColor:'#fff'}}>
                        <TouchableOpacity activeOpacity={0.8}  onPress={this._cancle.bind(this)}><Text style={{fontSize:16,}}allowFontScaling={false}>取消</Text></TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}  onPress={this._finish.bind(this)}><Text style={{fontSize:16,}}allowFontScaling={false}>完成</Text></TouchableOpacity>
                    </View>
                    <View style={{flex:1,}}>
                         <DatePickerIOS
					          date={this.state.date}
					          mode="datetime"
					          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
					          onDateChange={this.onDateChange.bind(this)}
					        />
                    </View>
                </Animated.View> : null}

                {this.state.timesshowa ? <Animated.View style={{flexDirection:'column',height:260,position:'absolute',bottom:this.state.bottom1,left:0,width:Dimensions.get('window').width,backgroundColor:'#eee'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:45,paddingRight:10,paddingLeft:10,backgroundColor:'#fff'}}>
                        <TouchableOpacity activeOpacity={0.8}  onPress={this._cancle.bind(this)}><Text style={{fontSize:16,}}allowFontScaling={false}>取消</Text></TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}  onPress={this._finish1.bind(this)}><Text style={{fontSize:16,}}allowFontScaling={false}>完成</Text></TouchableOpacity>
                    </View>
                    <View style={{flex:1,}}>
                         <DatePickerIOS
					          date={this.state.date}
					          mode="datetime"
					          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
					          onDateChange={this.onDateChange.bind(this)}
					        />
                    </View>
                </Animated.View> : null}

				{this.state.statu ? <Animated.View style={{opacity: this.state.fadeAnim,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				  <Icon name="ios-close-outline" color="#fff"size={36}  />
				  <Text style={{fontSize:16,color:'#fff',marginTop:20,}}allowFontScaling={false}>加载失败，请重新加载。</Text>
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
});
